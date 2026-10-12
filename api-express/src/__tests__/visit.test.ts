import { afterEach, beforeEach, describe, it, expect } from "vitest";
import prisma from "~/prisma";
import { api, bearer, signup } from "./helpers";
import { sourceOf, externalReferrer } from "~/utils/visit-source";

const IPHONE = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Instagram 350.0";

describe("sourceOf", () => {
  it("groups the hosts of one platform under one name", () => {
    expect(sourceOf("https://l.instagram.com/?u=https%3A%2F%2Fwww.quizz-du-berger.com", null)).toBe("Instagram");
    expect(sourceOf("https://www.google.fr/", null)).toBe("Google");
    expect(sourceOf("https://gemini.google.com/", null)).toBe("Gemini");
    expect(sourceOf("android-app://com.google.android.gm/", null)).toBe("Gmail");
    expect(sourceOf("https://forum.hardware.fr/hfr/Discussions/x.htm", null)).toBe("forum.hardware.fr");
  });

  it("falls back on utm_source, and on nothing for a direct visit", () => {
    expect(sourceOf(null, "chatgpt.com")).toBe("ChatGPT");
    expect(sourceOf(null, "newsletter")).toBe("newsletter");
    expect(sourceOf(null, null)).toBeNull();
  });

  it("ignores the site's own pages as referrer", () => {
    expect(externalReferrer("https://www.quizz-du-berger.com/themes")).toBeNull();
    expect(externalReferrer("pas une url")).toBeNull();
  });
});

describe("POST /visit", () => {
  it("records a page view sent as text/plain by sendBeacon", async () => {
    const res = await api()
      .post("/visit")
      .set("User-Agent", IPHONE)
      .set("Content-Type", "text/plain")
      .send(JSON.stringify({ path: "/comparer/a-vs-b", isEntry: true, referrer: "https://l.instagram.com/" }));

    expect(res.status).toBe(204);
    const [view] = await prisma.pageView.findMany();
    expect(view).toMatchObject({ path: "/comparer/a-vs-b", isEntry: true, source: "Instagram", device: "mobile" });
  });

  it("gives the same visitor id to two pages of the same visitor", async () => {
    await api().post("/visit").set("User-Agent", IPHONE).send({ path: "/", isEntry: true });
    await api().post("/visit").set("User-Agent", IPHONE).send({ path: "/themes" });

    const views = await prisma.pageView.findMany();
    expect(views).toHaveLength(2);
    expect(views[0].visitorId).toBe(views[1].visitorId);
  });

  it("skips crawlers and refuses a missing path", async () => {
    await api().post("/visit").set("User-Agent", "Googlebot/2.1").send({ path: "/" });
    const bad = await api().post("/visit").set("User-Agent", IPHONE).send({ path: "https://ailleurs.com" });

    expect(bad.status).toBe(400);
    expect(await prisma.pageView.count()).toBe(0);
  });
});

describe("POST /visit/bots", () => {
  beforeEach(() => {
    process.env.ANALYTICS_BOT_TOKEN = "jeton-de-test";
  });
  afterEach(() => {
    delete process.env.ANALYTICS_BOT_TOKEN;
  });

  it("stores a batch only with the shared token", async () => {
    const hits = [{ at: Date.now(), bot: "ChatGPT-User", category: "ai-answer", path: "/partis", status: 200 }];

    const refused = await api().post("/visit/bots").send({ hits });
    const accepted = await api().post("/visit/bots").set("x-analytics-token", "jeton-de-test").send({ hits });

    expect(refused.status).toBe(401);
    expect(accepted.body).toEqual({ ok: true, data: { count: 1 } });
    expect(await prisma.botHit.findMany()).toMatchObject([{ bot: "ChatGPT-User", category: "ai-answer", path: "/partis" }]);
  });
});

describe("GET /visit/stats", () => {
  it("is reserved to admins", async () => {
    const user = await signup("curieux");
    const res = await api().get("/visit/stats").set(bearer(user.token));
    expect(res.status).toBe(401);
  });

  it("counts visits per source and filters pages on one source", async () => {
    const admin = await signup("admin");
    await prisma.user.update({ where: { id: admin.id }, data: { isAdmin: true } });
    await api().post("/visit").set("User-Agent", IPHONE).send({ path: "/", isEntry: true, referrer: "https://l.instagram.com/" });
    await api().post("/visit").set("User-Agent", IPHONE).send({ path: "/themes", referrer: "https://l.instagram.com/" });
    await api().post("/visit").set("User-Agent", "Mozilla/5.0 (Macintosh)").send({ path: "/partis", isEntry: true });

    const all = await api().get("/visit/stats").set(bearer(admin.token));
    const instagram = await api().get("/visit/stats").query({ source: "Instagram" }).set(bearer(admin.token));

    expect(all.body.data.totals).toEqual({ pageviews: 3, visits: 2, visitors: 2 });
    expect(all.body.data.sources).toEqual([
      { name: "Direct", count: 1 },
      { name: "Instagram", count: 1 },
    ]);
    expect(instagram.body.data.pages.map((p: { name: string }) => p.name).sort()).toEqual(["/", "/themes"]);
  });
});
