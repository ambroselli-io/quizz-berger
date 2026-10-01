import { describe, it, expect } from "vitest";
import prisma from "~/prisma";
import candidatesAnswers from "~/shared/candidates-answers.json";
import { answer, answersOf, api, bearer, signup } from "./helpers";

describe("POST /answer", () => {
  it("saves the answer for the logged-in user, whatever userId the body claims", async () => {
    const attacker = await signup("attacker");
    const victim = await signup("victim");

    const res = await api()
      .post("/answer")
      .set(bearer(attacker.token))
      .send({ userId: victim.id, themeId: "theme-2027-immigration", questionId: "question-2027-immi-01", answerIndex: 0 });

    expect(res.status).toBe(200);
    expect(await answersOf(victim.id)).toEqual([]);
    expect(await answersOf(attacker.id)).toMatchObject([{ questionId: "question-2027-immi-01", answerIndex: 0 }]);
  });

  it("returns the new answerIndex when an answer is changed", async () => {
    const user = await signup("changer");
    await answer(user.token, "question-2027-immi-01", 1);

    const res = await answer(user.token, "question-2027-immi-01", 3);

    expect(res.body.data.answerIndex).toBe(3);
    expect(await answersOf(user.id)).toMatchObject([{ answerIndex: 3 }]);
  });

  it("returns the created answer, and keeps one row per question", async () => {
    const user = await signup("returner");

    const created = await answer(user.token, "question-2027-immi-01", 1);
    const changed = await answer(user.token, "question-2027-immi-01", 2);

    expect(created.body.data).toMatchObject({
      userId: user.id,
      themeId: "theme-2027-immigration",
      questionId: "question-2027-immi-01",
      answerIndex: 1,
    });
    expect(typeof created.body.data.id).toBe("string");
    // Written in UTC like Prisma does, whatever the server time zone.
    expect(Math.abs(new Date(created.body.data.createdAt).getTime() - Date.now())).toBeLessThan(60_000);
    expect(changed.body.data.id).toBe(created.body.data.id);
    expect(await answersOf(user.id)).toHaveLength(1);
  });

  it("adds the theme to the user once", async () => {
    const user = await signup("themer");

    await answer(user.token, "question-2027-immi-01", 0);
    await answer(user.token, "question-2027-immi-02", 0);

    expect((await prisma.user.findUniqueOrThrow({ where: { id: user.id } })).themes).toEqual(["theme-2027-immigration"]);
  });

  it("rejects a malformed answer", async () => {
    const user = await signup("sloppy");
    const res = await api()
      .post("/answer")
      .set(bearer(user.token))
      .send({ themeId: "theme-2027-immigration", questionId: "question-2027-immi-01", answerIndex: "1" });
    expect(res.status).toBe(409);
  });

  it("rejects the token of a deleted user", async () => {
    const user = await signup("ghost");
    await prisma.user.delete({ where: { id: user.id } });

    const res = await answer(user.token, "question-2027-immi-01", 0);

    expect(res.status).toBe(401);
  });

  it("rejects anonymous calls", async () => {
    const res = await api().post("/answer").send({ themeId: "theme-2027-immigration", questionId: "question-2027-immi-01", answerIndex: 0 });
    expect(res.status).toBe(401);
  });
});

describe("GET /answer/candidates", () => {
  it("serves every candidate's answers, gzipped or not", async () => {
    const gzipped = await api().get("/answer/candidates").set("Accept-Encoding", "gzip");
    const plain = await api().get("/answer/candidates").set("Accept-Encoding", "identity");

    expect(gzipped.headers["content-encoding"]).toBe("gzip");
    expect(plain.headers["content-encoding"]).toBeUndefined();
    for (const res of [gzipped, plain]) {
      expect(res.status).toBe(200);
      expect(res.headers["content-type"]).toMatch(/application\/json/);
      expect(res.body).toEqual({ ok: true, data: candidatesAnswers });
    }
  });
});
