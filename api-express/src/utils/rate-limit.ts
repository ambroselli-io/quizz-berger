import rateLimit from "express-rate-limit";

const limiter = (windowMinutes: number, limit: number) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { ok: false, code: "TOO_MANY_REQUESTS", error: "Trop de tentatives, veuillez réessayer dans quelques minutes." },
  });

// A whole classroom can share one IP, so these stay generous: they only stop scripted abuse.
export const loginLimiter = limiter(15, 30);
export const signupLimiter = limiter(60, 30);
export const anonymousUserLimiter = limiter(60, 300);
export const feedbackLimiter = limiter(60, 10);
