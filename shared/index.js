const podium = require("./utils/podium");
const score = require("./utils/score");
const quizz = require("./quizz.json");

module.exports = {
  ...podium,
  ...score,
  quizz,
};
