const podium = require("./utils/podium");
const score = require("./utils/score");
const quizz = require("./utils/quizz");

module.exports = {
  ...podium,
  ...score,
  quizz,
};
