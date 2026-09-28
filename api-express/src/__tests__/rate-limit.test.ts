import { describe, it, expect } from "vitest";
import { api } from "./helpers";

// Own file: the limiter keeps its counters in memory for the whole module.
describe("rate limits", () => {
  it("blocks the 31st login attempt within 15 minutes", async () => {
    for (let i = 0; i < 30; i++) {
      const res = await api().post("/user/login").send({ pseudo: "nobody", password: "guess" });
      expect(res.status).toBe(400);
    }

    const res = await api().post("/user/login").send({ pseudo: "nobody", password: "guess" });

    expect(res.status).toBe(429);
    expect(res.body.error).toMatch(/Trop de tentatives/);
  });
});
