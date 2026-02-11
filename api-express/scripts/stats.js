require("../src/mongo");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const quizz = require("../../shared/quizz-2027.json");
// const UserObject = require("../src/models/user");
const AnswerObject = require("../src/models/answer");
const md5 = require("md5");
const users = require("../../backup_2022-06-08/users.json");
const answers = require("../../backup_2022-06-08/answers.json");

const appealingFactor = (number, force = false) => {
  if (!force) return number;
  number = Number(number);
  return number * 10 + [...String(number)].reduce((sum, chiffre) => sum + Number(chiffre), 0);
};

(async () => {
  console.log(appealingFactor(users.length, true));
  console.log(appealingFactor(answers.length, true));
})();
