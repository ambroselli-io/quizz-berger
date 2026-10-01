import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import { api } from "./helpers";
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
