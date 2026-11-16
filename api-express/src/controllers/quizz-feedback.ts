import express from "express";
import passport from "passport";
import type { User } from "@prisma/client";
import prisma from "~/prisma";
import { catchErrors } from "~/utils/error";
import { quizzFeedbackLimiter } from "~/utils/rate-limit";

// "Ce quiz vous a plu ?" on /result. The click on a rating creates the row, so a rating counts even when
// "Envoyer mon avis" is never pressed; changing the rating or adding a comment updates that same row.
const router = express.Router();

const MAX_RATING = 4;
const MAX_COMMENT_LENGTH = 2000;

const optionalUser = (req: express.Request, res: express.Response, next: express.NextFunction) =>
  passport.authenticate("user", { session: false }, (_err: unknown, user: User | false) => {
    if (user) req.user = user;
    next();
  })(req, res, next);

const parseRating = (value: unknown) =>
  Number.isInteger(value) && (value as number) >= 0 && (value as number) <= MAX_RATING ? (value as number) : null;

const parseComment = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim().slice(0, MAX_COMMENT_LENGTH) : null;

router.post(
  "/",
  quizzFeedbackLimiter,
  optionalUser,
  catchErrors(async (req: express.Request, res: express.Response) => {
    const rating = parseRating(req.body.rating);
    if (rating === null) {
      res.status(400).send({ ok: false, error: "rating must be an integer between 0 and 4" });
      return;
    }
    const answersCount = Number.isInteger(req.body.answersCount) ? Math.max(0, req.body.answersCount) : 0;
    const user = req.user as User | undefined;
    const feedback = await prisma.quizzFeedback.create({
      data: { rating, answersCount, comment: parseComment(req.body.comment), userId: user?.id ?? null },
    });
    res.status(200).send({ ok: true, data: { id: feedback.id } });
  }),
);

// The id is an unguessable uuid only the page that created the row knows: it is the only credential.
router.put(
  "/:id",
  quizzFeedbackLimiter,
  catchErrors(async (req: express.Request, res: express.Response) => {
    const data: { rating?: number; comment?: string | null } = {};
    if (req.body.rating !== undefined) {
      const rating = parseRating(req.body.rating);
      if (rating === null) {
        res.status(400).send({ ok: false, error: "rating must be an integer between 0 and 4" });
        return;
      }
      data.rating = rating;
    }
    if (req.body.comment !== undefined) data.comment = parseComment(req.body.comment);
    const { count } = await prisma.quizzFeedback.updateMany({ where: { id: String(req.params.id) }, data });
    if (!count) {
      res.status(404).send({ ok: false, error: "feedback not found" });
      return;
    }
    res.status(200).send({ ok: true });
  }),
);

export default router;
