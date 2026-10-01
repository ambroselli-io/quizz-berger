import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { api } from "./helpers";
import app from "~/app";
import prisma from "~/prisma";

const capture = vi.hoisted(() => vi.fn());
vi.mock("~/third-parties/sentry", () => ({ capture }));

const TOKEN = "a-long-load-test-token";

describe("load test requests", () => {
  beforeAll(() => {
    process.env.LOAD_TEST_TOKEN = TOKEN;
  });
  afterAll(() => {
    delete process.env.LOAD_TEST_TOKEN;
  });

  it("flags the anonymous users they create, and only theirs", async () => {
    const flagged = await api().post("/user").set("x-load-test", TOKEN);
    const wrongToken = await api().post("/user").set("x-load-test", "a-long-load-test-tokeX");
    const normal = await api().post("/user");

    const isLoadTest = async (res: { body: { data: { _id: string } } }) =>
      (await prisma.user.findUniqueOrThrow({ where: { id: res.body.data._id } })).isLoadTest;
    expect(await isLoadTest(flagged)).toBe(true);
    expect(await isLoadTest(wrongToken)).toBe(false);
    expect(await isLoadTest(normal)).toBe(false);
  });

  it("flags nothing when LOAD_TEST_TOKEN is unset", async () => {
    delete process.env.LOAD_TEST_TOKEN;
    const res = await api().post("/user").set("x-load-test", "");
    expect((await prisma.user.findUniqueOrThrow({ where: { id: res.body.data._id } })).isLoadTest).toBe(false);
    process.env.LOAD_TEST_TOKEN = TOKEN;
  });

  it("are not rate limited, unlike everyone else", async () => {
    // One server for the 600 requests: api() opens a new one per request, which runs out of sockets here.
    const server = app.listen(0);
    const post = () => request(server).post("/user");
    for (let i = 0; i < 301; i++) {
      expect((await post().set("x-load-test", TOKEN)).status).toBe(200);
    }
    // The other tests already spent part of this IP's 300/h budget.
    let status = 200;
    for (let i = 0; i < 301 && status === 200; i++) status = (await post()).status;
    expect(status).toBe(429);
    server.close();
  }, 60_000);

  it("keeps their errors out of Sentry", async () => {
    capture.mockClear();
    // An object pseudo makes Prisma throw, which goes through sendError.
    const loadTest = await api()
      .post("/user/login")
      .set("x-load-test", TOKEN)
      .send({ pseudo: { unknownPrismaFilter: "x" }, password: "x" });
    expect(loadTest.status).toBe(500);
    expect(capture).not.toHaveBeenCalled();

    const real = await api()
      .post("/user/login")
      .send({ pseudo: { unknownPrismaFilter: "x" }, password: "x" });
    expect(real.status).toBe(500);
    expect(capture).toHaveBeenCalledTimes(1);
  });
});
