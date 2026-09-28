import { describe, it, expect } from "vitest";
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

  it("rejects anonymous calls", async () => {
    const res = await api().post("/answer").send({ themeId: "theme-2027-immigration", questionId: "question-2027-immi-01", answerIndex: 0 });
    expect(res.status).toBe(401);
  });
});
