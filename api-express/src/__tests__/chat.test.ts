import { describe, it, expect, vi, beforeEach } from "vitest";
import { simulateReadableStream } from "ai";
import prisma from "~/prisma";
import { getSystemPrompt } from "~/utils/chat-prompts";
import { MAX_CHATS_PER_DAY, MAX_USER_MESSAGES_PER_CHAT } from "~/controllers/chat";
import { api, bearer, signup } from "./helpers";

const model = vi.hoisted(() => ({ current: null as unknown }));
vi.mock("~/utils/chat-model", () => ({
  CHAT_MODEL: "mock-model",
  getChatModel: () => model.current,
  chatCostEur: (input: number, output: number) => (input + output) / 1000,
}));

// ai/test needs msw, which this project does not install: a hand-made LanguageModelV2 is enough.
type StreamCall = { prompt: Array<{ role: string; content: unknown }> };
const mockModel = (doStream: () => Promise<unknown>) => {
  const doStreamCalls: Array<StreamCall> = [];
  return {
    specificationVersion: "v2" as const,
    provider: "mock",
    modelId: "mock-model",
    supportedUrls: {},
    doGenerate: async () => {
      throw new Error("not used");
    },
    doStream: async (options: StreamCall) => {
      doStreamCalls.push(options);
      return doStream();
    },
    doStreamCalls,
  };
};

const replyWith = (words: Array<string>) => {
  const mock = mockModel(async () => ({
    stream: simulateReadableStream({
      chunks: [
        { type: "text-start" as const, id: "t" },
        ...words.map((delta) => ({ type: "text-delta" as const, id: "t", delta })),
        { type: "text-end" as const, id: "t" },
        { type: "finish" as const, finishReason: "stop" as const, usage: { inputTokens: 100, outputTokens: 20, totalTokens: 120 } },
      ],
    }),
  }));
  model.current = mock;
  return mock;
};

const failing = () => {
  model.current = mockModel(async () => {
    throw new Error("Mistral is down");
  });
};

const startChat = (token: string, body: Record<string, unknown>) => api().post("/chat").set(bearer(token)).send(body);
const send = (token: string, chatId: string, text: string) => api().post(`/chat/${chatId}/message`).set(bearer(token)).send({ text });

beforeEach(() => {
  replyWith(["Et ", "pour ", "qui ?"]);
});

describe("POST /chat", () => {
  it("refuses anonymous quiz users", async () => {
    const anonymous = await api().post("/user");

    const res = await startChat(anonymous.body.token, { mode: "president" });

    expect(res.status).toBe(403);
    expect(res.body.code).toBe("ACCOUNT_REQUIRED");
  });

  it("opens the president mode with the bot's question", async () => {
    const user = await signup("berger");

    const res = await startChat(user.token, { mode: "president" });

    expect(res.body.data.messages).toEqual([{ role: "assistant", content: "Alors, tu ferais quoi si t'étais président ?" }]);
    expect(res.body.donation).toEqual({ previousChatsCount: 0 });
  });

  it("needs a known candidate to convince", async () => {
    const user = await signup("berger");

    expect((await startChat(user.token, { mode: "convaincre" })).status).toBe(400);
    expect((await startChat(user.token, { mode: "convaincre", candidateId: "candidate-nobody" })).status).toBe(400);
    expect((await startChat(user.token, { mode: "convaincre", candidateId: "candidate-nathalie-arthaud" })).body.data.candidateId).toBe(
      "candidate-nathalie-arthaud",
    );
  });

  it("counts the previous conversations, for the donation prompt", async () => {
    const user = await signup("berger");
    const first = await startChat(user.token, { mode: "contre-moi-meme" });
    await send(user.token, first.body.data.id, "Il faut tout nationaliser");
    // Opened but never used: it cost nothing, so it is not counted.
    await startChat(user.token, { mode: "president" });

    const res = await startChat(user.token, { mode: "president" });

    expect(res.body.donation).toEqual({ previousChatsCount: 1 });
  });

  it(`stops at ${MAX_CHATS_PER_DAY} conversations a day`, async () => {
    const user = await signup("bavard");
    await prisma.chat.createMany({
      data: Array.from({ length: MAX_CHATS_PER_DAY }, () => ({ userId: user.id, mode: "president", model: "mock-model" })),
    });

    const res = await startChat(user.token, { mode: "president" });

    expect(res.status).toBe(429);
    expect(res.body.code).toBe("CHAT_DAILY_LIMIT");
  });
});

describe("POST /chat/:id/message", () => {
  it("streams the reply and stores both messages with their cost", async () => {
    const user = await signup("berger");
    const chat = await startChat(user.token, { mode: "president" });

    const res = await send(user.token, chat.body.data.id, "  Je baisserais les impôts  ");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Et pour qui ?");
    const stored = await prisma.chat.findUniqueOrThrow({ where: { id: chat.body.data.id } });
    expect(stored.messages).toEqual([
      { role: "assistant", content: "Alors, tu ferais quoi si t'étais président ?" },
      { role: "user", content: "Je baisserais les impôts" },
      { role: "assistant", content: "Et pour qui ?" },
    ]);
    expect(stored).toMatchObject({ inputTokens: 100, outputTokens: 20, costEur: 0.12 });
  });

  it("sends the stored history and the mode's system prompt to the model", async () => {
    const user = await signup("berger");
    const chat = await startChat(user.token, { mode: "convaincre", candidateId: "candidate-nathalie-arthaud" });
    const mock = replyWith(["Réponse"]);

    await send(user.token, chat.body.data.id, "Pourquoi ?");

    const prompt = mock.doStreamCalls[0].prompt;
    expect(prompt[0]).toEqual({ role: "system", content: getSystemPrompt("convaincre", "candidate-nathalie-arthaud") });
    expect(prompt.slice(1).map((m) => m.role)).toEqual(["assistant", "user"]);
  });

  it("does not let a user write in someone else's conversation", async () => {
    const owner = await signup("owner");
    const intruder = await signup("intruder");
    const chat = await startChat(owner.token, { mode: "president" });

    const res = await send(intruder.token, chat.body.data.id, "Coucou");

    expect(res.status).toBe(404);
  });

  it("rejects empty and oversized messages", async () => {
    const user = await signup("berger");
    const chat = await startChat(user.token, { mode: "president" });

    expect((await send(user.token, chat.body.data.id, "   ")).status).toBe(400);
    expect((await send(user.token, chat.body.data.id, "a".repeat(2001))).status).toBe(400);
  });

  it(`stops after ${MAX_USER_MESSAGES_PER_CHAT} user messages`, async () => {
    const user = await signup("berger");
    const chat = await startChat(user.token, { mode: "president" });
    await prisma.chat.update({
      where: { id: chat.body.data.id },
      data: { messages: Array.from({ length: MAX_USER_MESSAGES_PER_CHAT }, () => ({ role: "user", content: "bla" })) },
    });

    const res = await send(user.token, chat.body.data.id, "Encore");

    expect(res.status).toBe(409);
    expect(res.body.code).toBe("CHAT_TOO_LONG");
  });

  it("returns an empty body and keeps nothing when the model fails", async () => {
    const user = await signup("berger");
    const chat = await startChat(user.token, { mode: "president" });
    failing();

    const res = await send(user.token, chat.body.data.id, "Je baisserais les impôts");

    expect(res.text).toBe("");
    const stored = await prisma.chat.findUniqueOrThrow({ where: { id: chat.body.data.id } });
    expect(stored.messages).toHaveLength(1);
    expect(stored.costEur).toBe(0);
  });
});

describe("system prompts", () => {
  it("gives the candidate their quiz answers only, without the estimated 'et si un autre gagnait' theme", () => {
    const prompt = getSystemPrompt("convaincre", "candidate-nathalie-arthaud")!;

    expect(prompt).toContain("Tu joues le rôle de Nathalie Arthaud");
    expect(prompt).toContain("TA RÉPONSE");
    expect(prompt).not.toContain("Si Nathalie Arthaud était élue");
    expect(prompt).not.toContain("(pas de réponse connue)");
  });
});

describe("GET /chat", () => {
  it("lists the user's own conversations that got an answer, newest first", async () => {
    const user = await signup("berger");
    const other = await signup("voisin");
    const first = await startChat(user.token, { mode: "president" });
    await send(user.token, first.body.data.id, "Je baisserais les impôts");
    const second = await startChat(user.token, { mode: "contre-moi-meme" });
    await send(user.token, second.body.data.id, "Il faut tout nationaliser");
    await startChat(user.token, { mode: "president" });
    const theirs = await startChat(other.token, { mode: "president" });
    await send(other.token, theirs.body.data.id, "Pas à moi");

    const res = await api().get("/chat").set(bearer(user.token));

    expect(res.body.data.map((c: { preview: string }) => c.preview)).toEqual(["Il faut tout nationaliser", "Je baisserais les impôts"]);
    expect(res.body.data[0]).toMatchObject({ id: second.body.data.id, mode: "contre-moi-meme", messagesCount: 3 });
  });
});

describe("DELETE /chat/:id", () => {
  it("empties the conversation and hides it, but keeps what it cost and counts it in the daily limit", async () => {
    const user = await signup("berger");
    const chat = await startChat(user.token, { mode: "president" });
    await send(user.token, chat.body.data.id, "Je baisserais les impôts");

    const res = await api().delete(`/chat/${chat.body.data.id}`).set(bearer(user.token));

    expect(res.status).toBe(200);
    const stored = await prisma.chat.findUniqueOrThrow({ where: { id: chat.body.data.id } });
    expect(stored.messages).toEqual([]);
    expect(stored.costEur).toBe(0.12);
    expect((await api().get("/chat").set(bearer(user.token))).body.data).toEqual([]);
    expect((await api().get(`/chat/${chat.body.data.id}`).set(bearer(user.token))).status).toBe(404);
    expect((await send(user.token, chat.body.data.id, "Encore")).status).toBe(404);
    expect((await startChat(user.token, { mode: "president" })).body.donation.previousChatsCount).toBe(1);
  });

  it("does not let a user delete someone else's conversation", async () => {
    const owner = await signup("owner");
    const intruder = await signup("intruder");
    const chat = await startChat(owner.token, { mode: "president" });

    const res = await api().delete(`/chat/${chat.body.data.id}`).set(bearer(intruder.token));

    expect(res.status).toBe(404);
    expect((await prisma.chat.findUniqueOrThrow({ where: { id: chat.body.data.id } })).deletedAt).toBeNull();
  });
});
