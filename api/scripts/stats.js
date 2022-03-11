require("../src/mongo");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const { quizz } = require("quizz-du-berger-shared");
const UserObject = require("../src/models/user");
const AnswerObject = require("../src/models/answer");
const md5 = require("md5");

(async () => {
  let globalAmount = 0;
  const users = (
    await UserObject.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ])
  ).map((doc, index) => {
    globalAmount += doc.count;
    return Object.assign(doc, { cumulative: globalAmount });
  });
  console.log(JSON.stringify({ users }, null, 2));
})();
