import { describe, it, expect } from "vitest";
import prisma from "~/prisma";
import { answer, api, bearer, signup } from "./helpers";

describe("private profiles", () => {
  it("does not reveal a private user through ?ssr=true", async () => {
    await signup("secret-person");

    const res = await api().get("/user/secret-person?ssr=true");

    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
  });

  it("refuses to add a private user as a friend", async () => {
    const me = await signup("moi-meme");
    const hidden = await signup("hidden");

    await api().put("/user").set(bearer(me.token)).send({ friends: [hidden.id] });

    const stored = await prisma.user.findUniqueOrThrow({ where: { id: me.id }, include: { friends: true } });
    expect(stored.friends).toEqual([]);
  });

  it("stops sharing a friend's answers once they go private again", async () => {
    const me = await signup("moi-meme");
    const friend = await signup("friend", { isPublic: true });
    await answer(friend.token, "question-2027-immi-01", 2);
    await api().put("/user").set(bearer(me.token)).send({ friends: [friend.id] });
    expect((await api().get("/answer/friends").set(bearer(me.token))).body.data).toHaveLength(1);

    await prisma.user.update({ where: { id: friend.id }, data: { isPublic: false } });

    expect((await api().get("/answer/friends").set(bearer(me.token))).body.data).toEqual([]);
  });
});

describe("friends", () => {
  it("keeps the first friend when a second one is added, as the apps send only the new id", async () => {
    const me = await signup("moi-meme");
    const first = await signup("first", { isPublic: true });
    const second = await signup("second", { isPublic: true });

    await api().put("/user").set(bearer(me.token)).send({ friends: [first.id] });
    const res = await api().put("/user").set(bearer(me.token)).send({ friends: [second.id] });

    expect(res.body.data.friends.sort()).toEqual([first.id, second.id].sort());
  });

  it("returns the friend ids with the logged-in user", async () => {
    const me = await signup("moi-meme");
    const friend = await signup("friend", { isPublic: true });
    await api().put("/user").set(bearer(me.token)).send({ friends: [friend.id] });

    const res = await api().post("/user/me").set(bearer(me.token));

    expect(res.body.user.friends).toEqual([friend.id]);
  });

  it("never exposes friend ids on a public profile", async () => {
    const me = await signup("moi-meme", { isPublic: true });
    const friend = await signup("friend", { isPublic: true });
    await api().put("/user").set(bearer(me.token)).send({ friends: [friend.id] });

    const res = await api().get("/user/moi-meme");

    expect(res.body.data.friends).toEqual([]);
  });
});
