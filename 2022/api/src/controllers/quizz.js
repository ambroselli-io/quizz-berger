const express = require("express");
const router = express.Router();
const { catchErrors } = require("../utils/error");
const { quizz } = require("quizz-du-berger-shared");
const fs = require("fs");
const path = require("path");

router.get(
  "/",
  catchErrors(async (req, res) => {
    res.status(200).send({ ok: true, data: quizz });
  })
);

const formatAnswers = (answers) => answers.map((answer, answerIndex) => `      ${answerIndex + 1}. ${answer}`).join("\n");
const formatQuestions = (themeIndex, questions) =>
  questions
    .map(
      (question, questionIndex) => `  ${"ABCDEFGHIJKLMNOPQRST"[themeIndex]}${questionIndex + 1} - ${question.fr}\n${formatAnswers(question.answers)}`
    )
    .join("\n\n");

const formatQuizzText = (quizz) =>
  quizz.map((theme, index) => `${"ABCDEFGHIJKLMNOPQRST"[index]} - ${theme.fr}\n\n  ${formatQuestions(index, theme.questions)}`).join("\n\n\n");

router.get(
  "/download",
  catchErrors(async (req, res) => {
    const fileName = "quizz-du-berger_elections_presidentielles_2022_questions.txt";
    res.set({ "Content-Disposition": `attachment; filename=${fileName}` });
    res.send(formatQuizzText(quizz));
  })
);

router.get(
  "/download-analyze",
  catchErrors(async (req, res) => {
    const analyze = fs.readFileSync(path.resolve("./public/Analyse_Quizz_du_Berger.pdf"));

    res.set({ "Content-Disposition": "attachment; filename=Analyse_Quizz_du_Berger.pdf" });
    res.send(analyze);
  })
);

module.exports = router;
