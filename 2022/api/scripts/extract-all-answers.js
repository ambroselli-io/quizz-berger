require("../src/mongo");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { quizz } = import("quizz-du-berger-shared");
const UserObject = require("../src/models/user");
const AnswerObject = require("../src/models/answer");
const md5 = require("md5");

const questions = quizz.reduce((questions, theme) => [...questions, ...theme.questions], []);

(async () => {
  const candidates = await UserObject.find({ isCandidate: true });
  const candidatesAnswers = await AnswerObject.find({ user: candidates.map((c) => c._id) });
  for (const candidate of candidates) {
    const candidateQuizz = [];
    for (const theme of quizz) {
      const themeAnswers = {
        theme: theme.fr,
        answers: [],
      };
      for (const question of theme.questions) {
        const answer = candidatesAnswers.find((a) => a.questionId === question._id && candidate._id.equals(a.user));
        themeAnswers.answers.push({ question: question.fr, answer: question.answers[answer.answerIndex] });
      }
      candidateQuizz.push(themeAnswers);
    }
    // console.log(
    //   `Réponses de ${candidate.pseudo}\n\n\n${candidateQuizz
    //     .map(
    //       (themeAnswers) =>
    //         `\n\n${themeAnswers.theme}:\n\n\n${themeAnswers.answers.map(({ question, answer }) => `${question}\n${answer}`).join("\n\n")}`
    //     )
    //     .join("\n\n\n")}`
    // );
    console.log(candidate.pseudo);

    fs.writeFileSync(
      path.resolve(`../shared/candidates-answers/${candidate.pseudo}.txt`),
      `Réponses de ${candidate.pseudo}\n\n\n${candidateQuizz
        .map(
          (themeAnswers) =>
            `\n\n${themeAnswers.theme}:\n\n\n${themeAnswers.answers.map(({ question, answer }) => `${question}\n${answer}`).join("\n\n")}`
        )
        .join("\n\n\n")}`
    );
  }
})();
