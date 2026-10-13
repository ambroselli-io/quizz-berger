import { describe, it, expect } from "vitest";
import { answer, api, signup } from "./helpers";
import prisma from "~/prisma";

describe("GET /public/count", () => {
  it("counts users and answers, then serves the same figures for a minute", async () => {
    const user = await signup("compteur");
    await answer(user.token, "question-2027-immi-01", 0);

    const first = await api().get("/public/count");
    await answer(user.token, "question-2027-immi-02", 0);
    const second = await api().get("/public/count");

    expect(first.body).toEqual({ ok: true, data: { countUsers: 1, countAnswers: 1 } });
    expect(second.body).toEqual(first.body);
  });
});

describe("GET /public/charts", () => {
  it("counts the AI chats globally and per mode, deleted ones included", async () => {
    const alice = await signup("alice");
    const bob = await signup("bob");
    await prisma.chat.createMany({
      data: [
        { userId: alice.id, mode: "president", model: "mock-model", costEur: 0.5 },
        { userId: alice.id, mode: "president", model: "mock-model", costEur: 0.25 },
        { userId: bob.id, mode: "convaincre", candidateId: "x", model: "mock-model", costEur: 1, deletedAt: new Date() },
      ],
    });

    const res = await api().get("/public/charts");

    const { total, perMode, perDay } = res.body.data.chats;
    expect(total).toEqual({ chats: 3, costEur: 1.75 });
    expect(perMode).toEqual([
      { name: "president", chats: 2, costEur: 0.75 },
      { name: "convaincre", chats: 1, costEur: 1 },
    ]);
    expect(perDay).toHaveLength(1);
    expect(perDay[0]).toMatchObject({ president: 2, convaincre: 1 });
  });
});
