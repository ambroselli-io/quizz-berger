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

    const { total, users, perMode, perDay, usersPerDay } = res.body.data.chats;
    expect(total).toEqual({ chats: 3, costEur: 1.75 });
    expect(users).toBe(2);
    expect(perMode).toEqual([
      { name: "president", chats: 2, costEur: 0.75 },
      { name: "convaincre", chats: 1, costEur: 1 },
    ]);
    expect(perDay).toHaveLength(1);
    expect(perDay[0]).toMatchObject({ count: { president: 2, convaincre: 1 }, cumulative: { president: 2, convaincre: 1 } });
    expect(usersPerDay).toEqual([{ _id: perDay[0]._id, count: 2, cumulative: 2 }]);
  });
});

describe("GET /public/charts, AI users per day", () => {
  it("counts each user once per day, and once in the cumulative", async () => {
    const alice = await signup("alice");
    const bob = await signup("bob");
    await prisma.chat.createMany({
      data: [
        { userId: alice.id, mode: "president", model: "mock-model", createdAt: new Date("2026-10-01T10:00:00Z") },
        { userId: alice.id, mode: "convaincre", candidateId: "x", model: "mock-model", createdAt: new Date("2026-10-01T11:00:00Z") },
        { userId: alice.id, mode: "president", model: "mock-model", createdAt: new Date("2026-10-02T10:00:00Z") },
        { userId: bob.id, mode: "president", model: "mock-model", createdAt: new Date("2026-10-02T11:00:00Z") },
      ],
    });

    const res = await api().get("/public/charts");

    const { users, perDay, usersPerDay } = res.body.data.chats;
    expect(users).toBe(2);
    expect(usersPerDay).toEqual([
      { _id: "2026-10-01", count: 1, cumulative: 1 },
      { _id: "2026-10-02", count: 2, cumulative: 2 },
    ]);
    expect(perDay).toEqual([
      { _id: "2026-10-01", count: { president: 1, convaincre: 1 }, cumulative: { president: 1, convaincre: 1 } },
      { _id: "2026-10-02", count: { president: 2, convaincre: 0 }, cumulative: { president: 3, convaincre: 1 } },
    ]);
  });
});
