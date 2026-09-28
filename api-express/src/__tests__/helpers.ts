import request from "supertest";
import app from "~/app";
import prisma from "~/prisma";

export const api = () => request(app);

export const bearer = (token: string) => ({ Authorization: `Bearer ${token}` });

export async function signup(pseudo: string, { isPublic = false } = {}) {
  const res = await api().post("/user/signup").send({ pseudo, password: "motdepasse", passwordConfirm: "motdepasse", isPublic });
  if (!res.body.ok) throw new Error(`signup ${pseudo} failed: ${JSON.stringify(res.body)}`);
  return { id: res.body.data._id as string, token: res.body.token as string };
}

export async function answer(token: string, questionId: string, answerIndex: number, themeId = "theme-2027-immigration") {
  return api().post("/answer").set(bearer(token)).send({ themeId, questionId, answerIndex });
}

export const answersOf = (userId: string) => prisma.answer.findMany({ where: { userId } });
