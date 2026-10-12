import type { User } from "@prisma/client";

export const SUPPORTER_DAYS = 90;

export const isSupporter = (user: Pick<User, "supporterUntil">) => !!user.supporterUntil && user.supporterUntil > new Date();
