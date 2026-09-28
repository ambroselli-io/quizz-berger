import { describe, it, expect, vi, beforeEach } from "vitest";
import { answer, api, signup } from "./helpers";

const uploadBuffer = vi.hoisted(() => vi.fn());
vi.mock("~/utils/picture", () => ({ uploadBuffer }));
vi.mock("~/utils/og-image", () => ({ generateOgImage: vi.fn(async () => Buffer.from("png")) }));

const generate = (pseudo: string) => api().post("/og/generate").send({ pseudo });

describe("POST /og/generate", () => {
  beforeEach(() => uploadBuffer.mockClear());

  it("generates once, then reuses the image while the podium does not move", async () => {
    const user = await signup("sharer", { isPublic: true });
    await answer(user.token, "question-2027-immi-01", 0);

    expect((await generate("sharer")).body).toMatchObject({ generated: true });
    expect((await generate("sharer")).body).toMatchObject({ cached: true });
    expect(uploadBuffer).toHaveBeenCalledTimes(1);
  });

  it("regenerates the image after the answers change the podium", async () => {
    const user = await signup("sharer", { isPublic: true });
    await answer(user.token, "question-2027-immi-01", 0);
    await generate("sharer");

    await answer(user.token, "question-2027-immi-01", 4);
    const res = await generate("sharer");

    expect(res.body).toMatchObject({ generated: true });
    expect(uploadBuffer).toHaveBeenCalledTimes(2);
  });

  it("does not generate anything for a private user", async () => {
    await signup("private-one");
    expect((await generate("private-one")).status).toBe(404);
    expect(uploadBuffer).not.toHaveBeenCalled();
  });
});
