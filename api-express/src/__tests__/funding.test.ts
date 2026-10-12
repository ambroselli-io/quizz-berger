import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import prisma from "~/prisma";
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

const admin = async () => {
  const user = await signup("berger-en-chef");
  await prisma.user.update({ where: { id: user.id }, data: { isAdmin: true } });
  return user;
};

const propose = (token: string, title: string, description = "") => api().post("/ideas").set(bearer(token)).send({ title, description });

describe("GET /funding/summary", () => {
  it("adds the AI cost of every conversation to the expenses, and only totals the donations", async () => {
    const user = await signup("berger");
    await prisma.chat.create({ data: { userId: user.id, mode: "president", model: "m", costEur: 1.5 } });
    await prisma.ledgerEntry.createMany({
      data: [
        { kind: "donation", amountEur: 20, label: "Don Tipeee (Jean Dupont)", date: new Date() },
        { kind: "donation", amountEur: 5, label: "Don Tipeee (Marie)", date: new Date() },
        { kind: "expense", amountEur: 7, label: "Hébergement", date: new Date() },
      ],
    });

    const res = await api().get("/funding/summary");

    expect(res.body.data).toMatchObject({ donationsEur: 25, donationsCount: 2, aiEur: 1.5, spentEur: 8.5, remainingEur: 16.5 });
    expect(res.body.data.expenses).toMatchObject([{ label: "Hébergement", amountEur: 7 }]);
    expect(JSON.stringify(res.body)).not.toContain("Jean Dupont");
  });
});

describe("/funding/ledger", () => {
  it("lets the admin add and delete entries", async () => {
    const { token } = await admin();

    const created = await api().post("/funding/ledger").set(bearer(token)).send({ kind: "expense", amountEur: 12, label: "Nom de domaine" });
    expect(created.body.data).toMatchObject({ kind: "expense", amountEur: 12, label: "Nom de domaine" });

    await api().delete(`/funding/ledger/${created.body.data.id}`).set(bearer(token));
    expect(await prisma.ledgerEntry.count()).toBe(0);
  });

  it("is closed to everyone else", async () => {
    const user = await signup("berger");

    expect((await api().get("/funding/ledger").set(bearer(user.token))).status).toBe(401);
    expect((await api().post("/funding/ledger").set(bearer(user.token)).send({ kind: "donation", amountEur: 1000, label: "x" })).status).toBe(401);
  });
});

describe("validating a Tipeee donation", () => {
  it("records the amount typed by the admin in the ledger, once even if validated twice", async () => {
    const user = await signup("genereux");
    await api().post("/supporter/claim").set(bearer(user.token)).send({ tipeeePseudo: "berger75", amount: "5,50 €" });
    const token = decodeURIComponent(sentEmails[0].msg.text.match(/token=(\S+)/)![1]);

    const page = await api().get(`/supporter/validate?token=${encodeURIComponent(token)}`);
    expect(page.text).toContain('value="5.5"');

    await api().post("/supporter/validate").type("form").send({ token, amountEur: "5.5" });
    await api().post("/supporter/validate").type("form").send({ token, amountEur: "5.5" });

    expect(await prisma.ledgerEntry.findMany()).toMatchObject([{ kind: "donation", amountEur: 5.5, label: "Don Tipeee (berger75)" }]);
  });

  it("records nothing when the amount is left empty", async () => {
    const user = await signup("genereux");
    await api().post("/supporter/claim").set(bearer(user.token)).send({ tipeeePseudo: "berger75", amount: "un café" });
    const token = decodeURIComponent(sentEmails[0].msg.text.match(/token=(\S+)/)![1]);

    await api().post("/supporter/validate").type("form").send({ token, amountEur: "" });

    expect(await prisma.ledgerEntry.count()).toBe(0);
  });
});

describe("/ideas", () => {
  it("keeps a new idea pending, visible only to its author and the admin, and e-mails the admin", async () => {
    const author = await signup("auteur");
    const other = await signup("curieux");
    const boss = await admin();

    const res = await propose(author.token, "Un comparateur de programmes", "Thème par thème");

    expect(res.status).toBe(200);
    expect(sentEmails[0].msg.subject).toBe("Nouvelle idée de auteur : Un comparateur de programmes");
    expect((await api().get("/ideas")).body.data).toEqual([]);
    expect((await api().get("/ideas").set(bearer(other.token))).body.data).toEqual([]);
    expect((await api().get("/ideas").set(bearer(author.token))).body.data).toMatchObject([
      { title: "Un comparateur de programmes", status: "pending", isMine: true, votesCount: 1, hasVoted: true },
    ]);
    expect((await api().get("/ideas").set(bearer(boss.token))).body.data).toHaveLength(1);
  });

  it("publishes an idea once the admin opens it, and sorts by votes", async () => {
    const boss = await admin();
    const a = await signup("alice");
    const b = await signup("bob");
    const first = await propose(a.token, "Idée peu votée");
    const second = await propose(b.token, "Idée populaire");
    for (const id of [first.body.data.id, second.body.data.id]) {
      await api().put(`/ideas/${id}`).set(bearer(boss.token)).send({ status: "open" });
    }
    await api().post(`/ideas/${second.body.data.id}/vote`).set(bearer(a.token));

    const res = await api().get("/ideas");

    expect(res.body.data.map((i: { title: string; votesCount: number }) => [i.title, i.votesCount])).toEqual([
      ["Idée populaire", 2],
      ["Idée peu votée", 1],
    ]);
    expect(res.body.data[0].hasVoted).toBe(false);
  });

  it("toggles a vote, and refuses votes on pending or finished ideas", async () => {
    const boss = await admin();
    const author = await signup("auteur");
    const voter = await signup("votant");
    const idea = await propose(author.token, "Une idée");

    expect((await api().post(`/ideas/${idea.body.data.id}/vote`).set(bearer(voter.token))).status).toBe(404);

    await api().put(`/ideas/${idea.body.data.id}`).set(bearer(boss.token)).send({ status: "open" });
    expect((await api().post(`/ideas/${idea.body.data.id}/vote`).set(bearer(voter.token))).body.data.hasVoted).toBe(true);
    expect((await api().post(`/ideas/${idea.body.data.id}/vote`).set(bearer(voter.token))).body.data.hasVoted).toBe(false);

    await api().put(`/ideas/${idea.body.data.id}`).set(bearer(boss.token)).send({ status: "done" });
    expect((await api().post(`/ideas/${idea.body.data.id}/vote`).set(bearer(voter.token))).status).toBe(404);
  });

  it("needs a real account to propose or vote, and admin rights to moderate", async () => {
    const anonymous = await api().post("/user");
    const user = await signup("berger");
    const idea = await propose(user.token, "Une idée");

    expect((await propose(anonymous.body.token, "Spam")).status).toBe(403);
    expect((await api().put(`/ideas/${idea.body.data.id}`).set(bearer(user.token)).send({ status: "open" })).status).toBe(401);
    expect((await api().delete(`/ideas/${idea.body.data.id}`).set(bearer(user.token))).status).toBe(401);
  });

  it("rejects an empty or too long title", async () => {
    const user = await signup("berger");

    expect((await propose(user.token, "   ")).status).toBe(400);
    expect((await propose(user.token, "a".repeat(121))).status).toBe(400);
  });

  it("deletes an idea with its votes", async () => {
    const boss = await admin();
    const user = await signup("berger");
    const idea = await propose(user.token, "Une idée");

    await api().delete(`/ideas/${idea.body.data.id}`).set(bearer(boss.token));

    expect(await prisma.idea.count()).toBe(0);
    expect(await prisma.ideaVote.count()).toBe(0);
  });
});
