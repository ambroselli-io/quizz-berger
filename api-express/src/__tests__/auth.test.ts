import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import { api, signup } from "./helpers";

const lifetimeOf = (token: string) => {
  const { iat, exp } = jwt.decode(token) as { iat: number; exp: number };
  return exp - iat;
};

describe("JWT lifetime", () => {
  it("lasts 30 days for an account with a pseudo", async () => {
    const { token } = await signup("with-pseudo");
    expect(lifetimeOf(token)).toBe(30 * 24 * 60 * 60);
  });

  it("lasts 3 hours for an anonymous user", async () => {
    const res = await api().post("/user");
    expect(lifetimeOf(res.body.token)).toBe(3 * 60 * 60);
  });
});
