import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import jwt from "jsonwebtoken";
import prisma from "~/prisma";
import { MAX_CHATS_PER_DAY } from "~/controllers/chat";
import { api, bearer, signup } from "./helpers";

let sentEmails: Array<{ msg: { subject: string; text: string } }>;

beforeEach(() => {
  sentEmails = [];
  vi.spyOn(globalThis, "fetch").mockImplementation(async (_url, init) => {
    sentEmails.push(JSON.parse(init!.body as string));
    return new Response("{}", { status: 200 });
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

const claim = (token: string, body: Record<string, unknown> = { tipeeePseudo: "berger75", amount: "5 €" }) =>
  api().post("/supporter/claim").set(bearer(token)).send(body);

const validationToken = () => {
  const link = sentEmails[0].msg.text.match(/token=(\S+)/)![1];
  return decodeURIComponent(link);
};

describe("POST /supporter/claim", () => {
  it("e-mails the admin a validation link, and grants nothing by itself", async () => {
    const user = await signup("genereux");

    const res = await claim(user.token);

    expect(res.status).toBe(200);
    expect(sentEmails).toHaveLength(1);
    expect(sentEmails[0].msg.subject).toBe("Don Tipeee déclaré par genereux (5 €)");
    expect(sentEmails[0].msg.text).toContain("Pseudo Tipeee : berger75");
    expect(sentEmails[0].msg.text).toContain("/supporter/validate?token=");
    expect(res.body.token).toBeUndefined();
    expect((await prisma.user.findUniqueOrThrow({ where: { id: user.id } })).supporterUntil).toBeNull();
  });

  it("needs the Tipeee pseudo and the amount", async () => {
    const user = await signup("genereux");

    expect((await claim(user.token, { tipeeePseudo: "berger75" })).status).toBe(400);
    expect(sentEmails).toHaveLength(0);
  });

  it("refuses anonymous quiz users", async () => {
    const anonymous = await api().post("/user");

    expect((await claim(anonymous.body.token)).status).toBe(403);
  });
});

describe("/supporter/validate", () => {
  it("only shows a confirmation button on GET, so a mail scanner opening the link validates nothing", async () => {
    const user = await signup("genereux");
    await claim(user.token);

    const res = await api().get(`/supporter/validate?token=${encodeURIComponent(validationToken())}`);

    expect(res.status).toBe(200);
    expect(res.text).toContain("Valider le don");
    expect(res.text).toContain("berger75");
    expect((await prisma.user.findUniqueOrThrow({ where: { id: user.id } })).supporterUntil).toBeNull();
  });

  it("grants 90 days of extended access on POST", async () => {
    const user = await signup("genereux");
    await claim(user.token);

    const res = await api().post("/supporter/validate").type("form").send({ token: validationToken() });

    expect(res.status).toBe(200);
    const { supporterUntil } = await prisma.user.findUniqueOrThrow({ where: { id: user.id } });
    const days = (supporterUntil!.getTime() - Date.now()) / (24 * 3600 * 1000);
    expect(days).toBeGreaterThan(89.9);
    expect(days).toBeLessThan(90.1);
  });

  it("refuses a login token, a forged token and an expired one", async () => {
    const user = await signup("malin");
    const forged = jwt.sign({ purpose: "supporter-claim", userId: user.id }, "not-the-secret");
    const expired = jwt.sign({ purpose: "supporter-claim", userId: user.id }, "test-secret", { expiresIn: -10 });

    for (const token of [user.token, forged, expired]) {
      expect((await api().post("/supporter/validate").type("form").send({ token })).status).toBe(400);
    }
    expect((await prisma.user.findUniqueOrThrow({ where: { id: user.id } })).supporterUntil).toBeNull();
  });
});

describe("supporter limits", () => {
  it("lets a supporter open more chats a day, without the donation prompt", async () => {
    const user = await signup("genereux");
    await prisma.user.update({ where: { id: user.id }, data: { supporterUntil: new Date(Date.now() + 24 * 3600 * 1000) } });
    await prisma.chat.createMany({
      data: Array.from({ length: MAX_CHATS_PER_DAY }, () => ({ userId: user.id, mode: "president", model: "m", outputTokens: 1 })),
    });

    const res = await api().post("/chat").set(bearer(user.token)).send({ mode: "president" });

    expect(res.status).toBe(200);
    expect(res.body.donation).toBeNull();
  });

  it("falls back to the normal limits once the access has expired", async () => {
    const user = await signup("ancien");
    await prisma.user.update({ where: { id: user.id }, data: { supporterUntil: new Date(Date.now() - 1000) } });
    await prisma.chat.createMany({
      data: Array.from({ length: MAX_CHATS_PER_DAY }, () => ({ userId: user.id, mode: "president", model: "m" })),
    });

    const res = await api().post("/chat").set(bearer(user.token)).send({ mode: "president" });

    expect(res.status).toBe(429);
  });
});
