import { describe, it, expect, vi } from "vitest";
import { api } from "./helpers";

const capture = vi.hoisted(() => vi.fn());
vi.mock("~/third-parties/sentry", () => ({ capture }));

describe("error reporting", () => {
  it("sends neither the password, nor the cookie, nor the bearer token", async () => {
    // An object pseudo makes Prisma throw, which goes through sendError.
    const res = await api()
      .post("/user/login")
      .set("Cookie", "jwt=cookie-token-value")
      .set("Authorization", "Bearer bearer-token-value")
      .send({ pseudo: { unknownPrismaFilter: "x" }, password: "my-password", passwordConfirm: "my-password" });

    expect(res.status).toBe(500);
    expect(capture).toHaveBeenCalledTimes(1);
    const sent = JSON.stringify(capture.mock.calls[0][1]);
    expect(sent).not.toContain("my-password");
    expect(sent).not.toContain("cookie-token-value");
    expect(sent).not.toContain("bearer-token-value");
  });
});
