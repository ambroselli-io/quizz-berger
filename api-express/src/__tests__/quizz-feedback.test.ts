import { describe, it, expect } from "vitest";
import prisma from "~/prisma";
import { api, bearer, signup } from "./helpers";

describe("/quizz-feedback", () => {
  it("saves the rating on the click, before any comment", async () => {
    const res = await api().post("/quizz-feedback").send({ rating: 3, answersCount: 20 });

    expect(res.status).toBe(200);
    const saved = await prisma.quizzFeedback.findUniqueOrThrow({ where: { id: res.body.data.id } });
    expect(saved).toMatchObject({ rating: 3, answersCount: 20, comment: null, userId: null });
  });

  it("links the rating to the user when there is one", async () => {
    const user = await signup("berger");

    const res = await api().post("/quizz-feedback").set(bearer(user.token)).send({ rating: 4 });

    const saved = await prisma.quizzFeedback.findUniqueOrThrow({ where: { id: res.body.data.id } });
    expect(saved.userId).toBe(user.id);
  });

  it("updates the same row when the rating changes and the comment comes", async () => {
    const { body } = await api().post("/quizz-feedback").send({ rating: 1 });

    await api().put(`/quizz-feedback/${body.data.id}`).send({ rating: 2 });
    await api().put(`/quizz-feedback/${body.data.id}`).send({ comment: "  Trop de questions  " });

    expect(await prisma.quizzFeedback.count()).toBe(1);
    const saved = await prisma.quizzFeedback.findUniqueOrThrow({ where: { id: body.data.id } });
    expect(saved).toMatchObject({ rating: 2, comment: "Trop de questions" });
  });

  it("refuses a rating outside 0-4 and an unknown id", async () => {
    expect((await api().post("/quizz-feedback").send({ rating: 5 })).status).toBe(400);
    expect((await api().post("/quizz-feedback").send({ rating: "3" })).status).toBe(400);
    expect((await api().put("/quizz-feedback/inconnu").send({ rating: 2 })).status).toBe(404);
    expect(await prisma.quizzFeedback.count()).toBe(0);
  });
});
