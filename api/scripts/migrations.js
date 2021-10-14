require("../src/mongo");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const quizz = require("../data/quizz.json");
const UserObject = require("../src/models/user");
const AnswerObject = require("../src/models/answer");

const questions = quizz.reduce((questions, theme) => [...questions, ...theme.questions], []);

const fiveAnswersScores = [
  [5, 3, 2, 0, 0, 0],
  [4, 5, 3, 1, 0, 0],
  [2, 3, 5, 3, 2, 0],
  [0, 1, 3, 5, 4, 0],
  [0, 0, 2, 3, 5, 0],
  [0, 0, 0, 0, 0, 0],
];

// (async () => {
//   for (const question of questions) {
//     if (question.answers.length === 6) {
//       if (JSON.stringify(question.scores) !== JSON.stringify(fiveAnswersScores)) {
//         console.log(question.fr);
//       }
//     }
//   }
// })();
