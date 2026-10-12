import { describe, it, expect } from "vitest";
import jwt from "jsonwebtoken";
import { api, bearer, signup } from "./helpers";
import prisma from "~/prisma";

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

describe("platform", () => {
  it("records the native app from its header, and the web device from the user agent", async () => {
    const app = await api().post("/user").set("X-Client-Platform", "android");
    const web = await api()
      .post("/user")
      .set("User-Agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148");
    const oldApp = await api().post("/user").set("User-Agent", "QuizzDuBerger/12 CFNetwork/1568.100.1 Darwin/24.0.0");

    const platformOf = async (id: string) => (await prisma.user.findUnique({ where: { id } }))?.platform;
    expect(await platformOf(app.body.data._id)).toBe("android");
    expect(await platformOf(web.body.data._id)).toBe("web-mobile");
    expect(await platformOf(oldApp.body.data._id)).toBe("ios");
  });
});

describe("password reset", () => {
  it("lets the next login choose a new password once the account is marked for reset", async () => {
    const { id } = await signup("forgetful");
    await prisma.user.update({ where: { id }, data: { password: "reset" } });

    const first = await api().post("/user/login").send({ pseudo: "forgetful", password: "nouveau" });
    expect(first.body.ok).toBe(true);

    const wrong = await api().post("/user/login").send({ pseudo: "forgetful", password: "autre" });
    expect(wrong.body.ok).toBe(false);

    const again = await api().post("/user/login").send({ pseudo: "forgetful", password: "nouveau" });
    expect(again.body.ok).toBe(true);
  });
});

describe("account creation from an anonymous user", () => {
  it("refuses a pseudo without a password", async () => {
    const { body } = await api().post("/user");
    const res = await api().put("/user").set(bearer(body.token)).send({ pseudo: "sans-mdp" });
    expect(res.body.ok).toBe(false);
  });

  it("refuses an empty password", async () => {
    const { body } = await api().post("/user");
    const res = await api().put("/user").set(bearer(body.token)).send({ pseudo: "mdp-vide", password: "" });
    expect(res.body.ok).toBe(false);
  });

  it("accepts a pseudo with a password", async () => {
    const { body } = await api().post("/user");
    const res = await api().put("/user").set(bearer(body.token)).send({ pseudo: "avec-mdp", password: "motdepasse" });
    expect(res.body.ok).toBe(true);
  });
});
