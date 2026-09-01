import express from "express";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { catchErrors } from "~/utils/error";
import quizz from "~/shared/quizz-2027.json";
import type { Theme } from "~/types/quizz";

const router = express.Router();

// Clients (the mobile app) poll /quizz/version and only re-download the whole
// quizz when this changes, so they get new questions without a store release.
const version = crypto.createHash("sha1").update(JSON.stringify(quizz)).digest("hex").slice(0, 12);

router.get(
  "/version",
  catchErrors(async (req: express.Request, res: express.Response) => {
    res.status(200).send({ ok: true, version });
  }),
);

router.get(
  "/",
  catchErrors(async (req: express.Request, res: express.Response) => {
    res.status(200).send({ ok: true, version, data: quizz });
  }),
);

const formatAnswers = (answers: string[]) => answers.map((answer, answerIndex) => `      ${answerIndex + 1}. ${answer}`).join("\n");

const formatQuestions = (themeIndex: number, questions: Theme["questions"]) =>
  questions
    .map(
      (question, questionIndex) => `  ${"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[themeIndex]}${questionIndex + 1} - ${question.fr}\n${formatAnswers(question.answers)}`,
    )
    .join("\n\n");

const formatQuizzText = (quizz: Theme[]) =>
  quizz.map((theme, index) => `${"ABCDEFGHIJKLMNOPQRSTUVWXYZ"[index]} - ${theme.fr}\n\n  ${formatQuestions(index, theme.questions)}`).join("\n\n\n");

router.get(
  "/download",
  catchErrors(async (req: express.Request, res: express.Response) => {
    const fileName = "quizz-du-berger_elections_presidentielles_2022_questions.txt";
    res.set({ "Content-Disposition": `attachment; filename=${fileName}` });
    res.send(formatQuizzText(quizz as Theme[]));
  }),
);

router.get(
  "/download-analyze",
  catchErrors(async (req: express.Request, res: express.Response) => {
    const analyze = fs.readFileSync(path.resolve("./public/Analyse_Quizz_du_Berger.pdf"));

    res.set({ "Content-Disposition": "attachment; filename=Analyse_Quizz_du_Berger.pdf" });
    res.send(analyze);
  }),
);

export default router;
