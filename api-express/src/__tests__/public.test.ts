import { describe, it, expect } from "vitest";
import { answer, api, signup } from "./helpers";

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
