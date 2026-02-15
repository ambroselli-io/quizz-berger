import express from "express";
import fs from "fs";
import path from "path";
import passport from "passport";
import nodeHtmlToImage from "node-html-to-image";
import { catchErrors } from "~/utils/error";
import { uploadBuffer } from "~/utils/picture";
import { getPodium, getPicName } from "~/shared/utils/podium";
import { getCandidatesScorePerThemes } from "~/shared/utils/score";
import quizz from "~/shared/quizz-2027.json";
import candidatesAnswersData from "~/shared/candidates-answers.json";
import prisma from "~/prisma";
import type { Question, Theme } from "~/types/quizz";
import { RequestWithUser } from "~/types/request";
import type { Answer } from "@prisma/client";
import { CandidateAnswer, MinimalUserAnswerWithScorePerThemeAndMax } from "~/types/answer";
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
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    if (!req.body.themeId) {
      res.status(409).send({ ok: false, error: "themeId is not provided" });
      return;
    }
    if (!req.body.hasOwnProperty("themeId")) {
      res.status(409).send({ ok: false, error: "questionId is not provided" });
      return;
    }
    if (!req.body.hasOwnProperty("questionId")) {
      res.status(409).send({ ok: false, error: "questionId is not provided" });
      return;
    }
    if (!req.body.hasOwnProperty("answerIndex")) {
      res.status(409).send({ ok: false, error: "answer index is not provided" });
      return;
    }

    const answerContent = {
      userId: req.body.userId,
      themeId: req.body.themeId,
      questionId: req.body.questionId,
    };

    let answer = await prisma.answer.findFirst({ where: answerContent });

    if (!answer) answer = await prisma.answer.create({ data: { ...answerContent, answerIndex: req.body.answerIndex } });

    await prisma.answer.update({ where: { id: answer.id }, data: { answerIndex: req.body.answerIndex } });

    const user = req.user!;
    if (!user.themes.includes(req.body.themeId)) {
      await prisma.user.update({ where: { id: user.id }, data: { themes: [...user.themes, req.body.themeId] } });
    }

    res.status(200).send({ ok: true, data: answer });
    return;
  }),
);

const candidatesAnswers = candidatesAnswersData as Array<CandidateAnswer>;

const getCandidatesAnswers = (): Array<CandidateAnswer> => candidatesAnswers;

router.get(
  "/candidates",
  catchErrors(async (req: express.Request, res: express.Response<CandidatesAnswersResponse>, next: express.NextFunction) => {
    res.status(200).send({ ok: true, data: getCandidatesAnswers() });
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

    const candidateAnswers = getCandidatesAnswers();

    const personsScore: Array<MinimalUserAnswerWithScorePerThemeAndMax> = getCandidatesScorePerThemes(
      userAnswers,
      candidateAnswers,
      quizzQuestions,
    ).map((c) => ({
      id: c.id,
      pseudo: c.pseudo,
      picture: c.picture,
      color: c.color,
      total: c.total,
      totalMax: c.totalMax,
    }));

    const podiumData = getPodium(personsScore, true).filter((_, i) => i < 6);

    const picName = getPicName(podiumData);

    const CDN_BASE = "https://quizz-du-berger-pictures.cellar-c2.services.clever-cloud.com";
    const pseudo = req.user?.pseudo;

    const existingPic = await fetch(`${CDN_BASE}/${picName}.png`);

    if (existingPic.status < 300) {
      // Image exists for this result set. Also save a copy under og/{pseudo}.png
      if (pseudo) {
        const imageBuffer = Buffer.from(await existingPic.arrayBuffer());
        await uploadBuffer(imageBuffer, `og/${pseudo}.png`, "no-cache");
      }
      return next();
    }

    const html = fs.readFileSync(path.resolve("./src/views/result.html"), "utf8");

    const newHtml = html.replace(
      "{{RESULTS}}",
      podiumData
        .map(
          ({ pictures, height, percent, colors }, i) =>
            `<div class="step">
                  <div class="stair-container">
                    <div class="stair ${
                      i === 0 ? "gold" : i == 1 ? "silver" : i == 2 ? "bronze" : ""
                    }" style="height: calc(${height}% - 20px); background-color: rgba(205, 127, 50, ${percent / 100});" >
                      <span style="font-size: min(10vw, ${Math.max((percent / 100) * 2.5, 0.75)}em);">${percent}%</span>
                    </div>
                    <div class="avatars" style="bottom: calc(${height}% - 40px);">
                      ${pictures.filter(Boolean).map(
                        (pic, index) =>
                          `<img
                          class="avatar"
                          style="border: 2px solid ${colors[index]}; background-color: ${colors[index]}"
                          alt="${pic}"
                          src="https://www.quizz-du-berger.com/${pic}"
                        />`,
                      )}
                    </div>
                  </div>
                </div>`,
        )
        .join(""),
    );

    const image = await nodeHtmlToImage({
      html: newHtml,
      puppeteerArgs: {
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
        ],
        headless: false,
        ignoreHTTPSErrors: true,
      },
    });

    await uploadBuffer(image as Buffer, `${picName}.png`);
    if (pseudo) {
      await uploadBuffer(image as Buffer, `og/${pseudo}.png`, "no-cache");
    }
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

    res.status(200).send({ ok: true, data: podiumData, user: candidate });
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
