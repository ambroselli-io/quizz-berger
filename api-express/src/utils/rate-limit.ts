import rateLimit from "express-rate-limit";
import { isLoadTest } from "./load-test";

const limiter = (windowMinutes: number, limit: number) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    // loadtest/elyze-x2.js creates thousands of users from one IP.
    skip: isLoadTest,
    message: { ok: false, code: "TOO_MANY_REQUESTS", error: "Trop de tentatives, veuillez réessayer dans quelques minutes." },
  });

// A whole classroom can share one IP, so these stay generous: they only stop scripted abuse.
export const loginLimiter = limiter(15, 30);
export const signupLimiter = limiter(60, 30);
export const anonymousUserLimiter = limiter(60, 300);
export const feedbackLimiter = limiter(60, 10);
// One call per page seen; a classroom behind one IP browses a lot, a script posting in a loop does not get through.
export const visitLimiter = limiter(1, 120);
// Each message costs real money (LLM tokens). Per-user caps live in controllers/chat.ts.
export const chatLimiter = limiter(60, 100);
export const supporterClaimLimiter = limiter(60, 10);
