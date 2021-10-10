const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const { catchErrors } = require("../utils/error");

router.get(
  "/:themeIndex/:questionIndex",
  catchErrors(async (req, res) => {
    if (process.env.NODE_ENV !== "development") return res.status(200).send("forbidden");
    const html = fs.readFileSync(path.resolve("./src/views/quizz-builder.html"), "utf8");

    const quizz = JSON.parse(fs.readFileSync(path.resolve("./data/quizz.json"), "utf8"));

    const currentTheme = quizz[req.params.themeIndex || 0];

    const themeName = currentTheme.fr;

    const currentQuestion = currentTheme.questions[req.params.questionIndex || 0];

    const { answers, fr, scores } = currentQuestion;

    const newHtml = html
      .replace("{{CURRENT_THEME}}", themeName)
      .replace("{{CURRENT_QUESTION}}", fr)
      .replace(
        "{{ALL_QUESTIONS}}",
        quizz.map(
          (theme, index) =>
            `<h3>${index + 1}: ${theme.fr}</h3><ol>${theme.questions.map(
              (q, qIndex) => `<li class="question" data-theme="${index}" data-question="${qIndex}">${q.fr}</li>`
            )}</ol>`
        )
      )
      .replace('<ol id="answers"></ol>', `<ol id="answers">${answers.map((a) => `<li><input maxlength="140" value="${a}" /></li>`).join("")}</ol>`)
      .replace("{{QUESTIONS_HEADER_ROW}}", `<th></th>${answers.map((a) => `<th>${a}</th>`).join("")}`)
      .replace(
        "{{SCORES}}",
        answers
          .map((a, index) => scores[Math.min(index, scores.length - 1)])
          .map((lineScore) => answers.map((_, index) => lineScore[index] || 0))
          .map(
            (lineScore, lineIndex) =>
              `<tr><td>${answers[lineIndex]}</td>${lineScore
                .map(
                  (score, columnIndex) => `<td><input value="${score}" class="score" data-line="${lineIndex}" data-column="${columnIndex}" /></td>`
                )
                .join("")}</tr>`
          )
          .join("")
      );

    res.status(200).set("Content-Type", "text/html").send(Buffer.from(newHtml));
  })
);

router.post(
  "/:themeIndex/:questionIndex",
  catchErrors(async (req, res) => {
    if (process.env.NODE_ENV !== "development") return res.status(200).send("forbidden");

    const { body } = req;

    const quizz = JSON.parse(fs.readFileSync(path.resolve("./data/quizz.json"), "utf8"));

    quizz[req.params.themeIndex || 0].fr = body.themeName;
    quizz[req.params.themeIndex || 0].questions[req.params.questionIndex || 0].fr = body.questionName;
    quizz[req.params.themeIndex || 0].questions[req.params.questionIndex || 0].answers = body.answers;
    quizz[req.params.themeIndex || 0].questions[req.params.questionIndex || 0].scores = body.scores;

    fs.writeFileSync(path.resolve("./data/quizz.json"), JSON.stringify(quizz, null, 2));

    res.status(200).send({ ok: true });
  })
);

module.exports = router;
