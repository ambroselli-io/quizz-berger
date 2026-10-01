import type express from "express";
import type { User } from "@prisma/client";

export interface RequestWithUser extends express.Request {
  user: User;
  isAdmin?: boolean;
}

export interface RequestWithUserId extends express.Request {
  user: { id: string };
}
