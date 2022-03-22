const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const passport = require("passport");
const fetch = require("node-fetch");
const UserObject = require("../models/user");
const AnswerObject = require("../models/answer");
const { catchErrors } = require("../utils/error");
const user = require("../models/user");
const nodeHtmlToImage = require("node-html-to-image");
const { uploadBuffer } = require("../utils/picture");
const { quizz } = require("quizz-du-berger-shared");
const { getPodium, getCandidatesScorePerThemes, getPicName } = require("quizz-du-berger-shared");
const quizzQuestions = quizz.reduce((questions, theme) => {
  return [...questions, ...theme.questions];
}, []);

// temporary cheating to make people more want even more to do the test...
// sorry for this, but no other choice yet !
const appealingFactor = (number, force = false) => {
  if (!force) return number;
  number = Number(number);
  return number * 10 + [...String(number)].reduce((sum, chiffre) => sum + Number(chiffre), 0);
};

router.get(
  "/count",
  catchErrors(async (req, res) => {
    console.log("coming from", req.query);
    const countUsers = appealingFactor(await UserObject.countDocuments({ $or: [{ isCandidate: false }, { isCandidate: { $exists: false } }] }), true);
    const countAnswers = appealingFactor(await AnswerObject.countDocuments(), true);

    res.status(200).send({ ok: true, data: { countUsers, countAnswers } });
  })
);

router.get(
  "/charts",
  catchErrors(async (req, res) => {
    let globalUsers = 0;
    const cumulativeUsers = (
      await UserObject.aggregate([
        {
          $match: { $or: [{ isCandidate: false }, { isCandidate: { $exists: false } }] },
        },
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
    )
      .map((doc) => {
        return Object.assign(doc, { count: appealingFactor(doc.count) });
      })
      .map((doc, index) => {
        globalUsers += doc.count;
        return Object.assign(doc, { cumulative: globalUsers });
      });

    let globalAnswers = 0;
    const answers = (
      await AnswerObject.aggregate([
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
    )
      .map((doc) => {
        return Object.assign(doc, { count: doc.count });
      })
      .map((doc, index) => {
        globalAnswers += doc.count;
        return Object.assign(doc, { cumulative: appealingFactor(globalAnswers) });
      });

    const countUsers = appealingFactor(await UserObject.countDocuments({ $or: [{ isCandidate: false }, { isCandidate: { $exists: false } }] }));
    const countAnswers = appealingFactor(await AnswerObject.countDocuments());

    const answersPerUserRaw = await AnswerObject.aggregate([
      {
        $match: {
          createdAt: { $gt: new Date("2022-02-24") },
        },
      },
      {
        $group: {
          _id: "$user",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: 1 },
      },
    ]);

    const answersPerUserAverage = Math.round(
      answersPerUserRaw.reduce((sum, userGroup) => sum + Math.min(userGroup.count, quizzQuestions.length), 0) / answersPerUserRaw.length
    );
    const answersPerUser = answersPerUserRaw.reduce(
      (averages, newItem) => {
        const newItemCount = Math.ceil(Math.min(quizzQuestions.length, newItem.count) / 10) * 10;
        if (averages.find((item) => item.name === newItemCount)) {
          return averages.map((item) => (item.name === newItemCount ? { ...item, totalUsers: item.totalUsers + 1 } : item));
        }
        return [...averages, { ...newItem, totalUsers: 1 }];
      },
      [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((name) => ({ name, totalUsers: 0 }))
    );

    const answersPerUserPerDay = cumulativeUsers
      .filter((u) => u._id >= "2022-02-25")
      .map((u) => ({
        _id: u._id,
        users: u.count,
        answers: answers.find((a) => a._id === u._id).count,
        percentageQuizz: Math.round((answers.find((a) => a._id === u._id).count / u.count / quizzQuestions.length) * 100),
      }));

    const answersPerTheme = (
      await AnswerObject.aggregate([
        {
          $match: {
            createdAt: { $gt: new Date("2022-02-25") },
          },
        },
        {
          $group: {
            _id: "$themeId",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: 1 },
        },
      ])
    ).map((doc) => {
      return {
        _id: doc._id,
        name: quizz.find((theme) => theme._id === doc._id)?.fr,
        value: Math.round(doc.count / quizz.find((theme) => theme._id === doc._id).questions.length),
      };
    });

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const now = new Date();
    const usersPerHourAggregation = await UserObject.aggregate([
      {
        $match: {
          createdAt: { $gt: new Date("2022-02-25"), $lt: start },
        },
      },
      {
        $project: {
          hour: { $hour: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$hour",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const usersPerHourToday = await UserObject.aggregate([
      {
        $match: {
          createdAt: { $gt: start },
        },
      },
      {
        $project: {
          hour: { $hour: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$hour",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const maxUsersOnADay = Math.max(...cumulativeUsers.map((c) => c.count));

    const totalUsersForTheDay = usersPerHourAggregation.reduce((sum, agg) => sum + agg.count, 0);
    let globalUsersForTheDay = 0;
    let globalUsersForToday = 0;
    const usersPerHour = usersPerHourAggregation.map((agg) => {
      const percentOftheDay = agg.count / totalUsersForTheDay;
      globalUsersForTheDay = globalUsersForTheDay + percentOftheDay;
      globalUsersForToday = globalUsersForToday + (usersPerHourToday.find((u) => u._id === agg._id)?.count || 0);
      return {
        _id: agg._id,
        count: percentOftheDay,
        cumulative: globalUsersForTheDay,
        today: now.getHours() < agg._id ? null : globalUsersForToday / maxUsersOnADay,
      };
    });

    const today = cumulativeUsers[cumulativeUsers.length - 1].count;
    const nowHour = new Date().getHours();
    const projection = Math.round(today / usersPerHour.find((u) => u._id === nowHour).cumulative);

    res.status(200).send({
      ok: true,
      data: {
        cumulativeUsers,
        answers,
        countUsers,
        countAnswers,
        answersPerUser,
        maxUsersOnADay,
        answersPerUserAverage,
        answersPerUserPerDay,
        answersPerTheme,
        usersPerHour,
        projection,
        today,
      },
    });
  })
);

module.exports = router;
