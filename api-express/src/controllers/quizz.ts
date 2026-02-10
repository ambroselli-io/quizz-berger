import express from "express";
import fs from "fs";
import path from "path";
import { catchErrors } from "~/utils/error";
import quizz from "~/shared/quizz.json";
import type { Theme } from "~/types/quizz";

const router = express.Router();

router.get(
  "/",
  catchErrors(async (req: express.Request, res: express.Response) => {
    res.status(200).send({ ok: true, data: quizz });
  }),
);

const formatAnswers = (answers: string[]) => answers.map((answer, answerIndex) => `      ${answerIndex + 1}. ${answer}`).join("\n");

const formatQuestions = (themeIndex: number, questions: Theme["questions"]) =>
  questions
    .map(
      (question, questionIndex) => `  ${"ABCDEFGHIJKLMNOPQRST"[themeIndex]}${questionIndex + 1} - ${question.fr}\n${formatAnswers(question.answers)}`,
    )
    .join("\n\n");

const formatQuizzText = (quizz: Theme[]) =>
  quizz.map((theme, index) => `${"ABCDEFGHIJKLMNOPQRST"[index]} - ${theme.fr}\n\n  ${formatQuestions(index, theme.questions)}`).join("\n\n\n");

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
