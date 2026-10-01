import express from "express";
import passport from "passport";
import { gzipSync } from "node:zlib";
import { catchErrors } from "~/utils/error";
import { getPodium } from "~/shared/utils/podium";
import { getCandidatesScorePerThemes } from "~/shared/utils/score";
import quizz from "~/shared/quizz-2027.json";
import candidatesAnswersData from "~/shared/candidates-answers.json";
import prisma from "~/prisma";
import type { Question, Theme } from "~/types/quizz";
import { RequestWithUser, RequestWithUserId } from "~/types/request";
import { Prisma, type Answer } from "@prisma/client";
import { CandidateAnswer } from "~/types/answer";
import {
  CandidatesAnswersResponse,
  FriendsAnswersResponse,
  RandomCandidateResponse,
  UserAnswersResponse,
  AnswersForUserResponse,
} from "~/types/responses";

const router = express.Router();

const quizzQuestions = quizz.reduce((questions, theme) => {
  return [...questions, ...theme.questions];
}, [] as Array<Question>);

const quizzQuestionsIds = quizz
  .reduce((questions: Array<Question>, theme: Theme) => {
    return [...questions, ...theme.questions];
  }, [] as Array<Question>)
  .map((q) => q._id);

router.post(
  "/",
  passport.authenticate("user-id", { session: false }),
  catchErrors(async (req: RequestWithUserId, res: express.Response, next: express.NextFunction) => {
    const { themeId, questionId, answerIndex } = req.body;
    // Raw SQL below: Prisma no longer checks the types, so they are checked here.
    if (typeof themeId !== "string" || !themeId) {
      res.status(409).send({ ok: false, error: "themeId is not provided" });
      return;
    }
    if (typeof questionId !== "string") {
      res.status(409).send({ ok: false, error: "questionId is not provided" });
      return;
    }
    if (!Number.isInteger(answerIndex)) {
      res.status(409).send({ ok: false, error: "answer index is not provided" });
      return;
    }
    const userId = req.user.id;

    // The hottest route under load, so one round trip instead of four (user lookup, findFirst, create or update,
    // themes update). Answer has no unique (userId, questionId) index, hence update, then insert if nothing matched.
    // Timestamps are written in UTC, as Prisma does.
    let answers: Array<Answer>;
    try {
      answers = await prisma.$queryRaw<Array<Answer>>`
        WITH updated AS (
          UPDATE "Answer" SET "answerIndex" = ${answerIndex}, "updatedAt" = timezone('UTC', now())
          WHERE "userId" = ${userId} AND "themeId" = ${themeId} AND "questionId" = ${questionId}
          RETURNING *
        ), inserted AS (
          INSERT INTO "Answer" ("id", "createdAt", "updatedAt", "themeId", "questionId", "answerIndex", "userId")
          SELECT gen_random_uuid()::text, timezone('UTC', now()), timezone('UTC', now()), ${themeId}, ${questionId}, ${answerIndex}, ${userId}
          WHERE NOT EXISTS (SELECT 1 FROM updated)
          RETURNING *
        ), themes AS (
          UPDATE "User" SET "themes" = array_append("themes", ${themeId}), "updatedAt" = timezone('UTC', now())
          WHERE "id" = ${userId} AND NOT COALESCE(${themeId} = ANY("themes"), false)
        )
        SELECT * FROM updated UNION ALL SELECT * FROM inserted`;
    } catch (error) {
      // Valid token of a deleted user: the insert breaks the Answer → User foreign key.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.meta?.code === "23503") {
        res.sendStatus(401);
        return;
      }
      throw error;
    }

    res.status(200).send({ ok: true, data: answers[0] });
    return;
  }),
);

const candidatesAnswers = candidatesAnswersData as Array<CandidateAnswer>;

const getCandidatesAnswers = (): Array<CandidateAnswer> => candidatesAnswers;

// Every quiz fetches these same 826 kB of JSON: serialising then gzipping them cost ~40 ms of CPU per call, a large
// share of the API under load. Both are done once, at startup.
const candidatesResponseJson = JSON.stringify({ ok: true, data: candidatesAnswers } satisfies CandidatesAnswersResponse);
const candidatesResponseGzip = gzipSync(candidatesResponseJson);

router.get(
  "/candidates",
  catchErrors(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.type("json");
    res.vary("Accept-Encoding");
    // The data only changes with a deploy.
    res.set("Cache-Control", "public, max-age=600");
    if (req.acceptsEncodings("gzip")) {
      // The compression middleware leaves a body that is already encoded alone.
      res.set("Content-Encoding", "gzip");
      res.send(candidatesResponseGzip);
    } else {
      res.send(candidatesResponseJson);
    }
  }),
);

router.get(
  "/friends",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response<FriendsAnswersResponse>, next: express.NextFunction) => {
    const friends = await prisma.user
      .findFirstOrThrow({
        where: { id: req.user.id },
        include: {
          friends: {
            where: { OR: [{ isPublic: true }, { isCandidate: true }] },
            include: {
              answers: {
                where: { questionId: { in: quizzQuestionsIds } },
              },
            },
          },
        },
      })
      .then((user) => user.friends);

    const populatedFriendsAnswers = friends.map((friend) => {
      return {
        id: friend.id,
        pseudo: friend.pseudo,
        isCandidate: false,
        themes: friend.themes,
        answers: friend.answers,
      };
    });

    res.status(200).send({ ok: true, data: populatedFriendsAnswers });
  }),
);

router.get(
  "/",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response<UserAnswersResponse>, next: express.NextFunction) => {
    const userAnswers = await prisma.answer.findMany({ where: { userId: req.user.id, questionId: { in: quizzQuestionsIds } } });

    res.status(200).send({ ok: true, data: userAnswers });
    return;
  }),
);

router.get(
  "/random/for-onboarding",
  catchErrors(async (req: express.Request, res: express.Response<RandomCandidateResponse>, next: express.NextFunction) => {
    const allCandidates = getCandidatesAnswers();
    if (!allCandidates.length) {
      res.status(200).send({ ok: true, data: [], user: null });
      return;
    }
    const candidate = allCandidates[Math.floor(Math.random() * allCandidates.length)];

    const personsScore = getCandidatesScorePerThemes(candidate.answers as Array<Answer>, allCandidates, quizzQuestions);
    const podiumData = getPodium(personsScore, true);

    const slimPodium = podiumData.map(({ pseudos, pictures, colors, height, percent }) => ({
      pseudos,
      pictures,
      colors,
      height,
      percent,
    }));
    const slimUser = { pseudo: candidate.pseudo, color: candidate.color };

    res.status(200).send({ ok: true, data: slimPodium, user: slimUser });
    return;
  }),
);

router.get(
  "/:pseudo",
  catchErrors(async (req: express.Request, res: express.Response<AnswersForUserResponse>, next: express.NextFunction) => {
    if (!req.params.pseudo) {
      res.status(400).send({ ok: false, data: [] });
      return;
    }
    const user = await prisma.user.findFirst({ where: { pseudo: req.params.pseudo } });
    if (!user || !(user.isPublic || user.isCandidate)) {
      res.status(400).send({ ok: false, data: [] });
      return;
    }
    const userAnswers = await prisma.answer.findMany({ where: { userId: user.id, questionId: { in: quizzQuestionsIds } } });

    res.status(200).send({ ok: true, data: userAnswers });
  }),
);

export default router;
