const fs = require("fs");
const path = require("path");
require("../src/mongo");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");

const { quizz } = require("quizz-du-berger-shared");

// (async () => {
//   for (const theme of quizz) {
//     theme._id = `theme-${mongoose.Types.ObjectId()}`;
//     console.log(theme._id);
//     for (const question of theme.questions) {
//       question._id = `question-${mongoose.Types.ObjectId()}`;
//       console.log(question._id);
//     }
//   }
//   fs.writeFileSync(path.resolve("../shared/quizz.json"), JSON.stringify(quizz, null, 2));
//   console.log("FOINITO");
// })();

(async () => {
  // for (const theme of quizz) {
  //   for (const question of theme.questions) {
  //     if (question.answers.length !== question.scores.length) console.log("PROBLEM", question._id);
  //   }
  // }
  // console.log("OK pas de prob");
})();
