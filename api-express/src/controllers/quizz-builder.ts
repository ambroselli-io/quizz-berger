import fs from "fs";
import path from "path";
import express from "express";
import crypto from "crypto";
import stringify from "json-stringify-pretty-compact";
import { catchErrors } from "~/utils/error";

const router = express.Router();

router.get(
  "/:themeIndex/:questionIndex",
  catchErrors(async (req: express.Request, res: express.Response) => {
    if (process.env.NODE_ENV !== "development") {
      res.status(200).send("forbidden");
      return;
    }
    const html = fs.readFileSync(path.resolve("./src/views/quizz-builder.html"), "utf8");

    const quizz = JSON.parse(fs.readFileSync(path.resolve("../../../shared/quizz-2027.json"), "utf8"));

    const currentTheme = quizz[Number(req.params.themeIndex) || 0];

    const themeName = currentTheme.fr;

    const currentQuestion = currentTheme.questions[Number(req.params.questionIndex) || 0];

    const { answers, fr, help, scores } = currentQuestion;

    const newHtml = html
      .replace("{{CURRENT_THEME}}", themeName)
      .replace("{{CURRENT_QUESTION}}", fr)
      .replace("{{CURRENT_HELP}}", help)
      .replace(
        "{{ALL_QUESTIONS}}",
        quizz
          .map(
            (theme: { fr: string; questions: Array<{ fr: string }> }, index: number) =>
              `<h3>${index + 1}: ${theme.fr}</h3><ol>${theme.questions
                .map((q, qIndex) => `<li class="question" data-theme="${index}" data-question="${qIndex}">${q.fr}</li>`)
                .join("<br />")}</ol>`,
          )
          .join(""),
      )
      .replace(
        '<ol id="answers"></ol>',
        `<ol id="answers">${answers.map((a: string) => `<li><input maxlength="140" value="${a}" /></li>`).join("")}</ol>`,
      )
      .replace("{{QUESTIONS_HEADER_ROW}}", `<th></th>${answers.map((a: string) => `<th>${a}</th>`).join("")}`)
      .replace(
        "{{SCORES}}",
        answers
          .map((a: string, index: number) => scores[Math.min(index, scores.length - 1)])
          .map((lineScore: number[]) => answers.map((_: string, index: number) => lineScore[index] || 0))
          .map(
            (lineScore: number[], lineIndex: number) =>
              `<tr><td>${answers[lineIndex]}</td>${lineScore
                .map(
                  (score, columnIndex) => `<td><input value="${score}" class="score" data-line="${lineIndex}" data-column="${columnIndex}" /></td>`,
                )
                .join("")}</tr>`,
          )
          .join(""),
      );

    res.status(200).set("Content-Type", "text/html").send(Buffer.from(newHtml));
  }),
);

router.post(
  "/new-theme",
  catchErrors(async (req: express.Request, res: express.Response) => {
    if (process.env.NODE_ENV !== "development") {
      res.status(200).send("forbidden");
      return;
    }

    const { currentThemeIndex } = req.body;

    const quizz = JSON.parse(fs.readFileSync(path.resolve("../../../shared/quizz-2027.json"), "utf8"));

    const newQuizz = quizz.reduce((themes: typeof quizz, theme: (typeof quizz)[0], index: number) => {
      themes.push(theme);
      if (index !== currentThemeIndex) return themes;
      themes.push({
        _id: `theme-${crypto.randomUUID()}`,
        fr: "Nouveau thème",
        questions: [
          {
            _id: `question-${crypto.randomUUID()}`,
            fr: "Nouvelle question",
            answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4", "Réponse 5", "Ça ne m'intéresse pas / Je n'ai pas d'avis"],
            scores: [
              [5, 3, 2, 0, 0, 0],
              [4, 5, 3, 1, 0, 0],
              [2, 3, 5, 3, 2, 0],
              [0, 1, 3, 5, 4, 0],
              [0, 0, 2, 3, 5, 0],
              [0, 0, 0, 0, 0, 0],
            ],
          },
        ],
      });
      return themes;
    }, []);

    fs.writeFileSync(path.resolve("../../../shared/quizz-2027.json"), stringify(newQuizz));

    res.status(200).send({ ok: true });
  }),
);

router.post(
  "/new-question",
  catchErrors(async (req: express.Request, res: express.Response) => {
    if (process.env.NODE_ENV !== "development") {
      res.status(200).send("forbidden");
      return;
    }

    const { currentThemeIndex, currentQuestionIndex } = req.body;

    const quizz = JSON.parse(fs.readFileSync(path.resolve("../../../shared/quizz-2027.json"), "utf8"));

    const newQuizz = quizz.map((theme: (typeof quizz)[0], index: number) => {
      if (index !== currentThemeIndex) return theme;
      return {
        ...theme,
        questions: theme.questions.reduce((questions: typeof theme.questions, question: (typeof theme.questions)[0], qIndex: number) => {
          questions.push(question);
          if (qIndex === currentQuestionIndex) {
            questions.push({
              _id: `question-${crypto.randomUUID()}`,
              fr: "Nouvelle question",
              answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4", "Réponse 5", "Ça ne m'intéresse pas / Je n'ai pas d'avis"],
              scores: [
                [5, 3, 2, 0, 0, 0],
                [4, 5, 3, 1, 0, 0],
                [2, 3, 5, 3, 2, 0],
                [0, 1, 3, 5, 4, 0],
                [0, 0, 2, 3, 5, 0],
                [0, 0, 0, 0, 0, 0],
              ],
            });
          }
          return questions;
        }, []),
      };
    });

    fs.writeFileSync(path.resolve("../../../shared/quizz-2027.json"), stringify(newQuizz));

    res.status(200).send({ ok: true });
  }),
);

const normalizedWord = (word: string) => word.normalize("NFD").toLowerCase().trim().normalize("NFKD").replace(/[^\w]/g, "");

router.post(
  "/:themeIndex/:questionIndex",
  catchErrors(async (req: express.Request, res: express.Response) => {
    if (process.env.NODE_ENV !== "development") {
      res.status(200).send("forbidden");
      return;
    }

    const { body } = req;

    const quizz = JSON.parse(fs.readFileSync(path.resolve("../../../shared/quizz-2027.json"), "utf8"));

    quizz[Number(req.params.themeIndex) || 0].fr = body.themeName;
    quizz[Number(req.params.themeIndex) || 0].questions[Number(req.params.questionIndex) || 0].fr = body.questionName;
    quizz[Number(req.params.themeIndex) || 0].questions[Number(req.params.questionIndex) || 0].help = body.help;
    quizz[Number(req.params.themeIndex) || 0].questions[Number(req.params.questionIndex) || 0].answers = body.answers;
    quizz[Number(req.params.themeIndex) || 0].questions[Number(req.params.questionIndex) || 0].scores = body.scores;

    fs.writeFileSync(
      path.resolve("../../../shared/quizz-2027.json"),
      stringify(quizz.sort((a: { fr: string }, b: { fr: string }) => (normalizedWord(a.fr) < normalizedWord(b.fr) ? -1 : 1))),
    );

    res.status(200).send({ ok: true });
  }),
);

export default router;
