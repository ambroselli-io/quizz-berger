import express from "express";
import { catchErrors } from "../utils/error";
import quizz from "~/shared/quizz-2027.json";
import { Question } from "~/types/quizz";
import prisma from "~/prisma";
import { CountResponse } from "~/types/responses";

const router = express.Router();

const quizzQuestions = quizz.reduce((questions, theme) => {
  return [...questions, ...theme.questions];
}, [] as Array<Question>);

// Every home page view asks for these totals, and counting the whole Answer table each time grew into a large share
// of the Postgres CPU under load. A figure up to a minute old is fine on the home page. The in-flight promise is
// shared, so an expiry under load triggers one count, not one per waiting request.
const COUNT_TTL_MS = 60_000;
let countCache: { at: number; promise: Promise<{ countUsers: number; countAnswers: number }> } | null = null;

const getCounts = () => {
  if (!countCache || Date.now() - countCache.at > COUNT_TTL_MS) {
    const promise = Promise.all([prisma.user.count({ where: { isCandidate: false } }), prisma.answer.count()]).then(([countUsers, countAnswers]) => ({
      countUsers,
      countAnswers,
    }));
    countCache = { at: Date.now(), promise };
    promise.catch(() => {
      if (countCache?.promise === promise) countCache = null;
    });
  }
  return countCache.promise;
};

router.get(
  "/count",
  catchErrors(async (req: express.Request, res: express.Response<CountResponse>, next: express.NextFunction) => {
    res.status(200).send({ ok: true, data: await getCounts() });
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
      globalUsers += doc.count;
      return { _id: doc._id, count: doc.count, cumulative: globalUsers };
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
      return { _id: doc._id, count: doc.count, cumulative: globalAnswers };
    });

    // Count totals
    const countUsers = await prisma.user.count({ where: { isCandidate: false } });
    const countAnswers = await prisma.answer.count();

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

    // Rows are sorted by count, so the median is the middle capped value.
    const cappedCounts = answersPerUserRaw.map((userGroup) => Math.min(userGroup.count, quizzQuestions.length));
    const middle = Math.floor(cappedCounts.length / 2);
    const answersPerUserMedian =
      cappedCounts.length === 0
        ? 0
        : cappedCounts.length % 2 === 1
          ? cappedCounts[middle]
          : Math.round((cappedCounts[middle - 1] + cappedCounts[middle]) / 2);

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

    const usersPerPlatform = await prisma.$queryRaw<Array<{ name: string; count: number }>>`
      SELECT "platform" as "name", COUNT(*)::int as "count"
      FROM "User"
      WHERE "platform" IS NOT NULL AND "isCandidate" = false
      GROUP BY "platform"
      ORDER BY "count" DESC
    `;
    const platformSince = await prisma.user.findFirst({
      where: { platform: { not: null } },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    });

    type ChatTotals = { name: string; chats: number; costEur: number };
    const [[chatsTotal], chatsPerModeRaw, chatsPerDayRaw, chatUsersPerDayRaw, newChatUsersPerDayRaw] = await Promise.all([
      prisma.$queryRaw<ChatTotals[]>`
        SELECT COUNT(*)::int AS "chats",
          COALESCE(SUM("costEur"), 0)::float AS "costEur"
        FROM "Chat"
      `,
      prisma.$queryRaw<ChatTotals[]>`
        SELECT "mode" AS "name", COUNT(*)::int AS "chats",
          COALESCE(SUM("costEur"), 0)::float AS "costEur"
        FROM "Chat"
        GROUP BY "mode"
        ORDER BY "chats" DESC
      `,
      prisma.$queryRaw<Array<{ _id: string; mode: string; count: number }>>`
        SELECT DATE("createdAt")::text AS "_id", "mode", COUNT(*)::int AS "count"
        FROM "Chat"
        GROUP BY 1, 2
        ORDER BY 1
      `,
      prisma.$queryRaw<Array<{ _id: string; count: number }>>`
        SELECT DATE("createdAt")::text AS "_id", COUNT(DISTINCT "userId")::int AS "count"
        FROM "Chat"
        GROUP BY 1
        ORDER BY 1
      `,
      // The cumulative counts each user once, on the day of their first chat.
      prisma.$queryRaw<Array<{ _id: string; count: number }>>`
        SELECT "firstDay"::text AS "_id", COUNT(*)::int AS "count"
        FROM (SELECT MIN(DATE("createdAt")) AS "firstDay" FROM "Chat" GROUP BY "userId") AS "firstChats"
        GROUP BY 1
      `,
    ]);

    const chatModes = chatsPerModeRaw.map((m) => m.name);
    const zeroPerMode = () => Object.fromEntries(chatModes.map((mode) => [mode, 0])) as Record<string, number>;
    const runningChats = zeroPerMode();
    const chatsPerDay: Array<{ _id: string; count: Record<string, number>; cumulative: Record<string, number> }> = [];
    for (const row of chatsPerDayRaw) {
      if (chatsPerDay[chatsPerDay.length - 1]?._id !== row._id) {
        chatsPerDay.push({ _id: row._id, count: zeroPerMode(), cumulative: {} });
      }
      const day = chatsPerDay[chatsPerDay.length - 1];
      day.count[row.mode] = row.count;
      runningChats[row.mode] += row.count;
      day.cumulative = { ...runningChats };
    }

    let globalChatUsers = 0;
    const chatUsersPerDay = chatUsersPerDayRaw.map((day) => {
      globalChatUsers += newChatUsersPerDayRaw.find((d) => d._id === day._id)?.count ?? 0;
      return { _id: day._id, count: day.count, cumulative: globalChatUsers };
    });

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
        answersPerUserMedian,
        answersPerUserPerDay,
        answersPerTheme,
        usersPerHour,
        projection,
        today,
        usersPerPlatform,
        platformSince: platformSince?.createdAt ?? null,
        chats: { total: chatsTotal, users: globalChatUsers, perMode: chatsPerModeRaw, perDay: chatsPerDay, usersPerDay: chatUsersPerDay },
      },
    });
  }),
);

export default router;
