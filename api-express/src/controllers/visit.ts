import express from "express";
import passport from "passport";
import { timingSafeEqual } from "node:crypto";
import { Prisma } from "@prisma/client";
import { catchErrors } from "~/utils/error";
import { visitLimiter } from "~/utils/rate-limit";
import { deviceOf, externalReferrer, looksLikeBot, sourceOf, visitorIdOf } from "~/utils/visit-source";
import * as config from "~/config";
import prisma from "~/prisma";

const router = express.Router();

const parisDay = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Paris" });

const text = (value: unknown, max: number) => (typeof value === "string" && value.trim() ? value.trim().slice(0, max) : null);

// sendBeacon posts text/plain (no CORS preflight), which express.text() leaves as a string.
const bodyOf = (req: express.Request): Record<string, unknown> => {
  if (typeof req.body !== "string") return req.body ?? {};
  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
};

router.post(
  "/",
  visitLimiter,
  catchErrors(async (req: express.Request, res: express.Response) => {
    const body = bodyOf(req);
    const path = text(body.path, 300);
    if (!path?.startsWith("/")) {
      res.status(400).send({ ok: false, error: "path manquant" });
      return;
    }
    const userAgent = req.get("user-agent") ?? "";
    if (looksLikeBot(userAgent)) {
      res.status(204).end();
      return;
    }
    const referrer = externalReferrer(body.referrer);
    const utmSource = text(body.utmSource, 100);
    await prisma.pageView.create({
      data: {
        path,
        isEntry: body.isEntry === true,
        source: sourceOf(referrer, utmSource),
        referrer,
        utmSource,
        utmMedium: text(body.utmMedium, 100),
        utmCampaign: text(body.utmCampaign, 200),
        device: deviceOf(userAgent),
        visitorId: visitorIdOf(config.SECRET, parisDay.format(new Date()), req.ip ?? "", userAgent),
      },
    });
    res.status(204).end();
  }),
);

const BOT_CATEGORIES = ["ai-answer", "indexing", "training", "preview", "other"];

const hasBotToken = (req: express.Request) => {
  const expected = process.env.ANALYTICS_BOT_TOKEN;
  const given = req.get("x-analytics-token");
  if (!expected || !given || given.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(given), Buffer.from(expected));
};

// Batches posted by app-tanstack/server.mjs, which sees every crawler request before the page is rendered.
router.post(
  "/bots",
  catchErrors(async (req: express.Request, res: express.Response) => {
    if (!hasBotToken(req)) {
      res.status(401).send({ ok: false });
      return;
    }
    const hits = Array.isArray(req.body?.hits) ? req.body.hits.slice(0, 1000) : [];
    const data = hits
      .map((hit: Record<string, unknown>) => ({
        createdAt: typeof hit.at === "number" ? new Date(hit.at) : new Date(),
        bot: text(hit.bot, 100),
        category: BOT_CATEGORIES.includes(hit.category as string) ? (hit.category as string) : "other",
        path: text(hit.path, 300),
        status: typeof hit.status === "number" ? hit.status : 0,
      }))
      .filter((hit: { bot: string | null; path: string | null }) => hit.bot && hit.path);
    if (data.length) await prisma.botHit.createMany({ data });
    res.status(200).send({ ok: true, data: { count: data.length } });
  }),
);

const DAY = /^\d{4}-\d{2}-\d{2}$/;
const local = Prisma.sql`("createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'Europe/Paris')`;

router.get(
  "/stats",
  passport.authenticate("admin", { session: false }),
  catchErrors(async (req: express.Request, res: express.Response) => {
    const today = parisDay.format(new Date());
    const monthAgo = parisDay.format(new Date(Date.now() - 29 * 24 * 3600 * 1000));
    const from = DAY.test(String(req.query.from)) ? String(req.query.from) : monthAgo;
    const to = DAY.test(String(req.query.to)) ? String(req.query.to) : today;
    const source = text(req.query.source, 100);
    const path = text(req.query.path, 300);

    const range = Prisma.sql`"createdAt" >= (${from}::date::timestamp AT TIME ZONE 'Europe/Paris' AT TIME ZONE 'UTC')
      AND "createdAt" < ((${to}::date + 1)::timestamp AT TIME ZONE 'Europe/Paris' AT TIME ZONE 'UTC')`;
    const filters = [range];
    if (source) filters.push(source === "Direct" ? Prisma.sql`"source" IS NULL` : Prisma.sql`"source" = ${source}`);
    if (path) filters.push(Prisma.sql`"path" = ${path}`);
    const where = Prisma.join(filters, " AND ");
    const botWhere = path ? Prisma.sql`${range} AND "path" = ${path}` : range;
    const bucket =
      from === to ? Prisma.sql`to_char(date_trunc('hour', ${local}), 'YYYY-MM-DD HH24:00')` : Prisma.sql`to_char(${local}, 'YYYY-MM-DD')`;

    type Row = Record<string, string | number | null>;
    const [
      [totals],
      timeline,
      sources,
      referrers,
      campaigns,
      entryPages,
      pages,
      devices,
      botCategories,
      bots,
      botTimeline,
      botPages,
    ] = await Promise.all([
      prisma.$queryRaw<Row[]>`
        SELECT COUNT(*)::int AS "pageviews", (COUNT(*) FILTER (WHERE "isEntry"))::int AS "visits",
          COUNT(DISTINCT "visitorId")::int AS "visitors"
        FROM "PageView" WHERE ${where}`,
      prisma.$queryRaw<Row[]>`
        SELECT ${bucket} AS "bucket", COUNT(*)::int AS "pageviews", (COUNT(*) FILTER (WHERE "isEntry"))::int AS "visits",
          COUNT(DISTINCT "visitorId")::int AS "visitors"
        FROM "PageView" WHERE ${where} GROUP BY 1 ORDER BY 1`,
      prisma.$queryRaw<Row[]>`
        SELECT COALESCE("source", 'Direct') AS "name", COUNT(*)::int AS "count"
        FROM "PageView" WHERE ${where} AND "isEntry" GROUP BY 1 ORDER BY 2 DESC LIMIT 50`,
      prisma.$queryRaw<Row[]>`
        SELECT "referrer" AS "name", COUNT(*)::int AS "count"
        FROM "PageView" WHERE ${where} AND "isEntry" AND "referrer" IS NOT NULL GROUP BY 1 ORDER BY 2 DESC LIMIT 100`,
      prisma.$queryRaw<Row[]>`
        SELECT CONCAT_WS(' / ', "utmSource", "utmMedium", "utmCampaign") AS "name", COUNT(*)::int AS "count"
        FROM "PageView" WHERE ${where} AND "isEntry" AND ("utmSource" IS NOT NULL OR "utmCampaign" IS NOT NULL)
        GROUP BY 1 ORDER BY 2 DESC LIMIT 50`,
      prisma.$queryRaw<Row[]>`
        SELECT "path" AS "name", COUNT(*)::int AS "count"
        FROM "PageView" WHERE ${where} AND "isEntry" GROUP BY 1 ORDER BY 2 DESC LIMIT 50`,
      prisma.$queryRaw<Row[]>`
        SELECT "path" AS "name", COUNT(*)::int AS "count"
        FROM "PageView" WHERE ${where} GROUP BY 1 ORDER BY 2 DESC LIMIT 50`,
      prisma.$queryRaw<Row[]>`
        SELECT "device" AS "name", COUNT(*)::int AS "count"
        FROM "PageView" WHERE ${where} AND "isEntry" GROUP BY 1 ORDER BY 2 DESC`,
      prisma.$queryRaw<Row[]>`
        SELECT "category" AS "name", COUNT(*)::int AS "count"
        FROM "BotHit" WHERE ${botWhere} GROUP BY 1 ORDER BY 2 DESC`,
      prisma.$queryRaw<Row[]>`
        SELECT "bot" AS "name", MIN("category") AS "category", COUNT(*)::int AS "count"
        FROM "BotHit" WHERE ${botWhere} GROUP BY 1 ORDER BY 3 DESC LIMIT 50`,
      prisma.$queryRaw<Row[]>`
        SELECT ${bucket} AS "bucket", "category", COUNT(*)::int AS "count"
        FROM "BotHit" WHERE ${botWhere} GROUP BY 1, 2 ORDER BY 1`,
      prisma.$queryRaw<Row[]>`
        SELECT "path" AS "name", COUNT(*)::int AS "count"
        FROM "BotHit" WHERE ${botWhere} GROUP BY 1 ORDER BY 2 DESC LIMIT 50`,
    ]);

    res.status(200).send({
      ok: true,
      data: {
        from,
        to,
        totals,
        timeline,
        sources,
        referrers,
        campaigns,
        entryPages,
        pages,
        devices,
        bots: { categories: botCategories, bots, timeline: botTimeline, pages: botPages },
      },
    });
  }),
);

export default router;
