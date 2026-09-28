import { afterAll, beforeEach, vi } from "vitest";
import prisma from "~/prisma";

// Legacy CommonJS module that requires ../config (TypeScript), which vitest cannot load natively; it only inits Sentry in production.
vi.mock("~/utils/sentry", () => ({ capture: vi.fn() }));

if (!/_test(\?|$)/.test(process.env.DATABASE_URL ?? "")) {
  throw new Error(`Refusing to run API tests against a non-test database: ${process.env.DATABASE_URL}`);
}

beforeEach(async () => {
  await prisma.$executeRawUnsafe(`TRUNCATE "Answer", "_UserFriends", "User" CASCADE`);
});

afterAll(async () => {
  await prisma.$disconnect();
});
