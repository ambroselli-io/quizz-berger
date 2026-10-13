import express from "express";
import passport from "passport";
import { stepCountIs, streamText } from "ai";
import type { Chat } from "@prisma/client";
import prisma from "~/prisma";
import { catchErrors } from "~/utils/error";
import { capture } from "~/utils/sentry";
import { chatLimiter } from "~/utils/rate-limit";
import { CHAT_MODEL, chatCostEur, getChatModel } from "~/utils/chat-model";
import {
  candidateNameOf,
  chatModes,
  getOpeningMessage,
  getSystemPrompt,
  QUIZZ_ANSWERS_TOOL,
  quizzAnswersTool,
  type ChatMode,
} from "~/utils/chat-prompts";
import type { RequestWithUser } from "~/types/request";
import { isSupporter } from "~/utils/supporter";

const router = express.Router();

// Cost guards: every message resends the whole conversation (and, for a candidate, the answers of the themes consulted so far) to the model.
export const MAX_USER_MESSAGES_PER_CHAT = 30;
export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_CHATS_PER_DAY = 50;
// Users who made a donation (controllers/supporter.ts).
export const SUPPORTER_MAX_USER_MESSAGES_PER_CHAT = 60;
export const SUPPORTER_MAX_CHATS_PER_DAY = 150;
// Reasoning is off (reasoningEffort "none"): with it on, Large 4 sometimes spent the whole budget thinking
// and sent back an empty reply. A 150-word reply is ~300 tokens.
const MAX_OUTPUT_TOKENS = 1500;

// themeIds: the quiz themes the candidate looked up to write this reply, sent back in the system prompt of the next messages
// so the model does not call the tool again for them. Never shown to the client.
type ChatMessage = { role: "user" | "assistant"; content: string; themeIds?: Array<string> };

const serializeChat = (chat: Chat) => ({
  id: chat.id,
  mode: chat.mode,
  candidateId: chat.candidateId,
  messages: (chat.messages as Array<ChatMessage>).map(({ role, content }) => ({ role, content })),
  createdAt: chat.createdAt,
});

router.post(
  "/",
  chatLimiter,
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    // Anonymous quiz users get a cookie too: chatting needs a real account.
    if (!req.user.pseudo) {
      res.status(403).send({ ok: false, code: "ACCOUNT_REQUIRED", error: "Il faut un compte pour discuter avec l'IA." });
      return;
    }
    const { mode, candidateId } = req.body;
    if (!chatModes.includes(mode)) {
      res.status(400).send({ ok: false, error: "Mode de discussion inconnu" });
      return;
    }
    if (mode === "convaincre" && (typeof candidateId !== "string" || !candidateNameOf(candidateId))) {
      res.status(400).send({ ok: false, error: "Candidat inconnu" });
      return;
    }
    const userId = req.user.id;
    const chatsToday = await prisma.chat.count({ where: { userId, createdAt: { gte: new Date(Date.now() - 24 * 3600 * 1000) } } });
    const supporter = isSupporter(req.user);
    const maxChatsPerDay = supporter ? SUPPORTER_MAX_CHATS_PER_DAY : MAX_CHATS_PER_DAY;
    if (chatsToday >= maxChatsPerDay) {
      res.status(429).send({
        ok: false,
        code: "CHAT_DAILY_LIMIT",
        error: `Tu as lancé ${maxChatsPerDay} discussions en 24 heures, c'est le maximum. Reviens demain !`,
      });
      return;
    }
    // Only conversations where the model actually answered cost something.
    const previous = await prisma.chat.count({ where: { userId, outputTokens: { gt: 0 } } });
    const chat = await prisma.chat.create({
      data: {
        userId,
        mode,
        candidateId: mode === "convaincre" ? candidateId : null,
        model: CHAT_MODEL,
        messages: [{ role: "assistant", content: getOpeningMessage(mode, candidateId) }],
      },
    });
    res.status(200).send({
      ok: true,
      data: serializeChat(chat),
      // No donation prompt for someone who already gave.
      donation: supporter ? null : { previousChatsCount: previous },
    });
  }),
);

// The user's own conversations, newest first, to pick one up again.
router.get(
  "/",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const chats = await prisma.chat.findMany({
      where: { userId: req.user.id, deletedAt: null, outputTokens: { gt: 0 } },
      orderBy: { updatedAt: "desc" },
    });
    res.status(200).send({
      ok: true,
      data: chats.map((chat) => {
        const messages = chat.messages as Array<ChatMessage>;
        return {
          id: chat.id,
          mode: chat.mode,
          candidateId: chat.candidateId,
          preview: messages.find((m) => m.role === "user")?.content.slice(0, 140) ?? "",
          messagesCount: messages.length,
          updatedAt: chat.updatedAt,
        };
      }),
    });
  }),
);

router.delete(
  "/:id",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const { count } = await prisma.chat.updateMany({
      where: { id: req.params.id, userId: req.user.id, deletedAt: null },
      data: { messages: [], deletedAt: new Date() },
    });
    if (!count) {
      res.status(404).send({ ok: false, error: "Discussion introuvable" });
      return;
    }
    res.status(200).send({ ok: true });
  }),
);

router.get(
  "/:id",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const chat = await prisma.chat.findFirst({ where: { id: req.params.id, userId: req.user.id, deletedAt: null } });
    if (!chat) {
      res.status(404).send({ ok: false, error: "Discussion introuvable" });
      return;
    }
    res.status(200).send({ ok: true, data: serializeChat(chat) });
  }),
);

// Streams the reply as plain text. The history is read from the database: the client only sends the new message.
router.post(
  "/:id/message",
  chatLimiter,
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
    if (!text) {
      res.status(400).send({ ok: false, error: "Message vide" });
      return;
    }
    if (text.length > MAX_MESSAGE_LENGTH) {
      res.status(400).send({ ok: false, error: `Ton message est trop long (${MAX_MESSAGE_LENGTH} caractères au maximum).` });
      return;
    }
    const chat = await prisma.chat.findFirst({ where: { id: req.params.id, userId: req.user.id, deletedAt: null } });
    if (!chat) {
      res.status(404).send({ ok: false, error: "Discussion introuvable" });
      return;
    }
    const messages = chat.messages as Array<ChatMessage>;
    const maxUserMessages = isSupporter(req.user) ? SUPPORTER_MAX_USER_MESSAGES_PER_CHAT : MAX_USER_MESSAGES_PER_CHAT;
    if (messages.filter((m) => m.role === "user").length >= maxUserMessages) {
      res.status(409).send({
        ok: false,
        code: "CHAT_TOO_LONG",
        error: "Cette discussion est arrivée à sa longueur maximale. Lance-en une nouvelle !",
      });
      return;
    }
    const consultedThemeIds = [...new Set(messages.flatMap((m) => m.themeIds ?? []))];
    const system = getSystemPrompt(chat.mode as ChatMode, chat.candidateId, consultedThemeIds);
    if (!system) {
      res.status(409).send({ ok: false, error: "Cette discussion ne peut plus continuer" });
      return;
    }

    const history: Array<ChatMessage> = [...messages, { role: "user", content: text }];
    const newThemeIds = new Set<string>();
    const startedAt = Date.now();
    let streamError: unknown = null;
    const result = streamText({
      model: getChatModel(),
      system,
      messages: history.map(({ role, content }) => ({ role, content })),
      ...(chat.mode === "convaincre" && chat.candidateId
        ? {
            tools: {
              [QUIZZ_ANSWERS_TOOL]: quizzAnswersTool(chat.candidateId, (themeIds) => themeIds.forEach((id) => newThemeIds.add(id))),
            },
            // Two rounds of lookups at most; the last step must answer, or the user would get an empty reply.
            stopWhen: stepCountIs(3),
            prepareStep: ({ stepNumber }: { stepNumber: number }) => (stepNumber === 2 ? { toolChoice: "none" as const } : {}),
          }
        : {}),
      maxOutputTokens: MAX_OUTPUT_TOKENS,
      providerOptions: { mistral: { reasoningEffort: "none" } },
      onError: ({ error }) => {
        streamError = error;
        console.error(`[chat] ${chat.id} stream error`, error);
        capture(error, { extra: { chatId: chat.id, mode: chat.mode } });
      },
    });

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      // nginx would otherwise buffer the whole reply before sending it
      "X-Accel-Buffering": "no",
    });
    let reply = "";
    try {
      for await (const delta of result.textStream) {
        reply += delta;
        res.write(delta);
      }
      if (reply) {
        const usage = await result.totalUsage;
        const inputTokens = usage.inputTokens ?? 0;
        const outputTokens = usage.outputTokens ?? 0;
        await prisma.chat.update({
          where: { id: chat.id },
          data: {
            messages: [...history, { role: "assistant", content: reply, ...(newThemeIds.size ? { themeIds: [...newThemeIds] } : {}) }],
            inputTokens: { increment: inputTokens },
            outputTokens: { increment: outputTokens },
            costEur: { increment: chatCostEur(inputTokens, outputTokens) },
          },
        });
      }
    } catch (error) {
      console.error(`[chat] ${chat.id} failed`, error);
      capture(error, { extra: { chatId: chat.id, mode: chat.mode } });
    }
    // These promises reject when the stream failed: the log must not throw in turn.
    const [finishReason, usage, reasoning, response] = await Promise.all([
      Promise.resolve(result.finishReason).catch(() => null),
      Promise.resolve(result.totalUsage).catch(() => null),
      Promise.resolve(result.reasoningText).catch(() => null),
      Promise.resolve(result.response).catch(() => null),
    ]);
    const summary = {
      chatId: chat.id,
      mode: chat.mode,
      model: CHAT_MODEL,
      ms: Date.now() - startedAt,
      finishReason,
      replyChars: reply.length,
      reasoningChars: reasoning?.length ?? 0,
      inputTokens: usage?.inputTokens,
      outputTokens: usage?.outputTokens,
      themeIds: [...newThemeIds],
      responseId: response?.id,
      clientClosed: res.writableEnded || res.destroyed,
      error: streamError ? String(streamError) : null,
    };
    console.log(`[chat] ${JSON.stringify(summary)}`);
    if (!reply) capture("Chat reply empty", { extra: summary });
    // An empty body tells the client the model failed; the user message is not kept, so it can be sent again.
    res.end();
  }),
);

export default router;
