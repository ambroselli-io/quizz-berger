import express from "express";
import { catchErrors } from "../utils/error";
import quizz from "~/shared/quizz.json";
import { Question } from "~/types/quizz";
import prisma from "~/prisma";
import { CountResponse } from "~/types/responses";

const router = express.Router();

const quizzQuestions = quizz.reduce((questions, theme) => {
  return [...questions, ...theme.questions];
}, [] as Array<Question>);

// temporary cheating to make people more want even more to do the test...
// sorry for this, but no other choice yet !
const appealingFactor = (number: number, force = false) => {
  if (!force) return number;
  number = Number(number);
  return number * 10 + [...String(number)].reduce((sum, chiffre) => sum + Number(chiffre), 0);
};

router.get(
  "/count",
  catchErrors(async (req: express.Request, res: express.Response<CountResponse>, next: express.NextFunction) => {
    const countUsers = appealingFactor(await prisma.user.count({ where: { isCandidate: false } }), true);
    const countAnswers = appealingFactor(await prisma.answer.count(), true);

    res.status(200).send({ ok: true, data: { countUsers, countAnswers } });
  }),
);

router.get(
  "/charts",
  catchErrors(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Users by date - using raw SQL for date grouping
    const usersByDateRaw = await prisma.$queryRaw<Array<{ _id: string; count: number }>>`
      SELECT DATE("createdAt")::text as "_id", COUNT(*)::int as "count"
      FROM "User"
      WHERE "isCandidate" = false OR "isCandidate" IS NULL
      GROUP BY DATE("createdAt")
      ORDER BY "_id"
    `;

    let globalUsers = 0;
    const cumulativeUsers = usersByDateRaw.map((doc) => {
      globalUsers += appealingFactor(doc.count);
      return { _id: doc._id, count: appealingFactor(doc.count), cumulative: globalUsers };
    });

    // Answers by date
    const answersRaw = await prisma.$queryRaw<Array<{ _id: string; count: number }>>`
      SELECT DATE("createdAt")::text as "_id", COUNT(*)::int as "count"
      FROM "Answer"
      GROUP BY DATE("createdAt")
      ORDER BY "_id"
    `;

    let globalAnswers = 0;
    const answers = answersRaw.map((doc) => {
      globalAnswers += doc.count;
      return { _id: doc._id, count: doc.count, cumulative: appealingFactor(globalAnswers) };
    });

    // Count totals
    const countUsers = appealingFactor(await prisma.user.count({ where: { isCandidate: false } }));
    const countAnswers = appealingFactor(await prisma.answer.count());

    // Answers per user (for users after 2022-02-24)
    const answersPerUserRaw = await prisma.$queryRaw<Array<{ _id: string; count: number }>>`
      SELECT "userId" as "_id", COUNT(*)::int as "count"
      FROM "Answer"
      WHERE "createdAt" > '2022-02-24'
      GROUP BY "userId"
      ORDER BY "count"
    `;

    const answersPerUserAverage = Math.round(
      answersPerUserRaw.reduce((sum, userGroup) => sum + Math.min(userGroup.count, quizzQuestions.length), 0) / answersPerUserRaw.length,
    );

    const answersPerUser = answersPerUserRaw.reduce(
      (averages, newItem) => {
        const newItemCount = Math.ceil(Math.min(quizzQuestions.length, newItem.count) / 10) * 10;
        if (averages.find((item) => item.name === newItemCount)) {
          return averages.map((item) => (item.name === newItemCount ? { ...item, totalUsers: item.totalUsers + 1 } : item));
        }
        return [...averages, { name: newItemCount, totalUsers: 1 }];
      },
      [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((name) => ({ name, totalUsers: 0 })),
    );

    const answersPerUserPerDay = cumulativeUsers
      .filter((u) => u._id >= "2022-02-25")
      .map((u) => {
        const answersForDay = answers.find((a) => a._id === u._id);
        return {
          _id: u._id,
          users: u.count,
          answers: answersForDay?.count || 0,
          percentageQuizz: Math.round(((answersForDay?.count || 0) / u.count / quizzQuestions.length) * 100),
        };
      });

    // Answers per theme
    const answersPerThemeRaw = await prisma.$queryRaw<Array<{ _id: string; count: number }>>`
      SELECT "themeId" as "_id", COUNT(*)::int as "count"
      FROM "Answer"
      WHERE "createdAt" > '2022-02-25'
      GROUP BY "themeId"
      ORDER BY "count"
    `;

    const answersPerTheme = answersPerThemeRaw.map((doc) => {
      const theme = quizz.find((theme) => theme._id === doc._id);
      return {
        _id: doc._id,
        name: theme?.fr,
        value: Math.round(doc.count / (theme?.questions.length || 1)),
      };
    });

    // Users per hour aggregation (for all time before today)
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const now = new Date();

    const usersPerHourAggregation = await prisma.$queryRaw<Array<{ _id: number; count: number }>>`
      SELECT EXTRACT(HOUR FROM "createdAt")::int as "_id", COUNT(*)::int as "count"
      FROM "User"
      WHERE "createdAt" > '2022-02-25' AND "createdAt" < ${start}
      GROUP BY EXTRACT(HOUR FROM "createdAt")
      ORDER BY "_id"
    `;

    // Users per hour today
    const usersPerHourToday = await prisma.$queryRaw<Array<{ _id: number; count: number }>>`
      SELECT EXTRACT(HOUR FROM "createdAt")::int as "_id", COUNT(*)::int as "count"
      FROM "User"
      WHERE "createdAt" > ${start}
      GROUP BY EXTRACT(HOUR FROM "createdAt")
      ORDER BY "_id"
    `;

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

    const today = cumulativeUsers[cumulativeUsers.length - 1]?.count || 0;
    const nowHour = new Date().getHours();
    const hourData = usersPerHour.find((u) => u._id === nowHour);
    const projection = hourData ? Math.round(today / hourData.cumulative) : 0;

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
  }),
);

export default router;
