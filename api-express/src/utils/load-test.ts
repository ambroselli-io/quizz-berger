import { timingSafeEqual } from "node:crypto";
import type { Request } from "express";

// Requests from loadtest/elyze-x2.js carry LOAD_TEST_TOKEN in this header: the users they create are
// flagged for deletion (scripts/delete-load-test-users.ts) and their errors stay out of Sentry.
// Unset in the environment = no request is ever treated as a load test.
export const isLoadTest = (req: Request) => {
  const expected = process.env.LOAD_TEST_TOKEN;
  const given = req.get("x-load-test");
  if (!expected || !given || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
};
