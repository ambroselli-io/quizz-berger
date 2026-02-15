import express from "express";
import { catchErrors } from "~/utils/error";
import { uploadBuffer } from "~/utils/picture";
import { getPodium, getPicName } from "~/shared/utils/podium";
import { getCandidatesScorePerThemes } from "~/shared/utils/score";
import { generateOgImage } from "~/utils/og-image";
import quizz from "~/shared/quizz-2027.json";
import candidatesAnswersData from "~/shared/candidates-answers.json";
import prisma from "~/prisma";
import type { Question, Theme } from "~/types/quizz";
import type { CandidateAnswer, MinimalUserAnswerWithScorePerThemeAndMax } from "~/types/answer";

const router = express.Router();

const quizzQuestions = quizz.reduce((questions: Array<Question>, theme: Theme) => {
  return [...questions, ...theme.questions];
}, [] as Array<Question>);

const quizzQuestionsIds = quizzQuestions.map((q) => q._id);

const candidatesAnswers = candidatesAnswersData as Array<CandidateAnswer>;

const CDN_BASE = "https://quizz-du-berger-og.cellar-c2.services.clever-cloud.com";

router.post(
  "/generate",
  catchErrors(async (req: express.Request, res: express.Response) => {
    const { pseudo } = req.body;
    if (!pseudo) {
      res.status(400).send({ ok: false, error: "pseudo is required" });
      return;
    }

    // Check if og/{pseudo}.png already exists on CDN
    try {
      const existing = await fetch(`${CDN_BASE}/og/${encodeURIComponent(pseudo)}.png`, { method: "HEAD" });
      if (existing.ok) {
        res.status(200).send({ ok: true, cached: true });
        return;
      }
    } catch {
      // CDN check failed, continue with generation
    }

    // Fetch user from DB
    const user = await prisma.user.findFirst({ where: { pseudo } });
    if (!user || !(user.isPublic || user.isCandidate)) {
      res.status(404).send({ ok: false, error: "user not found or not public" });
      return;
    }

    // Fetch user answers and compute podium
    const userAnswers = await prisma.answer.findMany({
      where: { userId: user.id, questionId: { in: quizzQuestionsIds } },
    });

    const personsScore: Array<MinimalUserAnswerWithScorePerThemeAndMax> = getCandidatesScorePerThemes(
      userAnswers,
      candidatesAnswers,
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

    // Skip if user already has this picName
    if (user.ogPicName === picName) {
      res.status(200).send({ ok: true, cached: true });
      return;
    }

    // Check if {picName}.png already exists on CDN (reuse across users with same results)
    let imageBuffer: Buffer | null = null;
    try {
      const existingPic = await fetch(`${CDN_BASE}/${picName}.png`);
      if (existingPic.ok) {
        imageBuffer = Buffer.from(await existingPic.arrayBuffer());
      }
    } catch {
      // CDN check failed, will generate
    }

    if (!imageBuffer) {
      // Generate new image with satori
      imageBuffer = await generateOgImage(podiumData);
      await uploadBuffer(imageBuffer, `${picName}.png`);
    }

    // Upload user-specific copy
    await uploadBuffer(imageBuffer, `og/${pseudo}.png`, "no-cache");

    // Update user's ogPicName in DB
    await prisma.user.update({ where: { id: user.id }, data: { ogPicName: picName } });

    res.status(200).send({ ok: true, generated: true });
  }),
);

export default router;
