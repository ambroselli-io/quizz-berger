import express from "express";
import passport from "passport";
import type { User } from "@prisma/client";
import prisma from "~/prisma";
import { catchErrors } from "~/utils/error";
import { sendAdminEmail } from "~/utils/admin-email";
import { ideaLimiter } from "~/utils/rate-limit";
import type { RequestWithUser } from "~/types/request";

// Ideas board of /soutenir: users propose what the donations should fund next and upvote.
// A new idea waits for the admin ("pending") before anyone else sees it: this is a political site.
const router = express.Router();

export const ideaStatuses = ["pending", "open", "planned", "in-progress", "done", "rejected"] as const;
const MAX_TITLE_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 1000;

// The list is public, but a logged-in user also sees their own pending ideas and which ones they voted for.
const optionalUser = (req: express.Request, res: express.Response, next: express.NextFunction) =>
  passport.authenticate("user", { session: false }, (_err: unknown, user: User | false) => {
    if (user) req.user = user;
    next();
  })(req, res, next);

const requireAccount = (req: RequestWithUser, res: express.Response) => {
  if (req.user.pseudo) return true;
  res.status(403).send({ ok: false, code: "ACCOUNT_REQUIRED", error: "Il faut un compte pour proposer ou voter." });
  return false;
};

router.get(
  "/",
  optionalUser,
  catchErrors(async (req: express.Request, res: express.Response) => {
    const user = (req as Partial<RequestWithUser>).user;
    const ideas = await prisma.idea.findMany({
      where: user?.isAdmin ? {} : { OR: [{ status: { not: "pending" } }, ...(user ? [{ authorId: user.id }] : [])] },
      include: { author: { select: { pseudo: true } }, votes: { select: { userId: true } } },
    });
    const data = ideas
      .map((idea) => ({
        id: idea.id,
        title: idea.title,
        description: idea.description,
        status: idea.status,
        authorPseudo: idea.author.pseudo,
        createdAt: idea.createdAt,
        votesCount: idea.votes.length,
        hasVoted: !!user && idea.votes.some((v) => v.userId === user.id),
        isMine: !!user && idea.authorId === user.id,
      }))
      .sort((a, b) => b.votesCount - a.votesCount || b.createdAt.getTime() - a.createdAt.getTime());
    res.status(200).send({ ok: true, data });
  }),
);

router.post(
  "/",
  ideaLimiter,
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    if (!requireAccount(req, res)) return;
    const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
    const description = typeof req.body.description === "string" ? req.body.description.trim() : "";
    if (!title || title.length > MAX_TITLE_LENGTH || description.length > MAX_DESCRIPTION_LENGTH) {
      res.status(400).send({
        ok: false,
        error: `Un titre est obligatoire (${MAX_TITLE_LENGTH} caractères au maximum, ${MAX_DESCRIPTION_LENGTH} pour la description).`,
      });
      return;
    }
    const idea = await prisma.idea.create({ data: { title, description, authorId: req.user.id } });
    // Its author votes for it, as on any ideas board.
    await prisma.ideaVote.create({ data: { ideaId: idea.id, userId: req.user.id } });
    await sendAdminEmail(
      `Nouvelle idée de ${req.user.pseudo} : ${title}`,
      `${title}\n\n${description}\n\nÀ valider sur https://www.quizz-du-berger.com/soutenir`,
    );
    res.status(200).send({ ok: true, data: { id: idea.id } });
  }),
);

// Toggles the vote. Only on published ideas still open to votes.
router.post(
  "/:id/vote",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    if (!requireAccount(req, res)) return;
    const idea = await prisma.idea.findFirst({ where: { id: req.params.id, status: { in: ["open", "planned", "in-progress"] } } });
    if (!idea) {
      res.status(404).send({ ok: false, error: "Idée introuvable" });
      return;
    }
    const where = { ideaId_userId: { ideaId: idea.id, userId: req.user.id } };
    const existing = await prisma.ideaVote.findUnique({ where });
    if (existing) await prisma.ideaVote.delete({ where });
    else await prisma.ideaVote.create({ data: { ideaId: idea.id, userId: req.user.id } });
    res.status(200).send({ ok: true, data: { hasVoted: !existing } });
  }),
);

router.put(
  "/:id",
  passport.authenticate("admin", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const { status, title, description } = req.body;
    if (status !== undefined && !ideaStatuses.includes(status)) {
      res.status(400).send({ ok: false, error: "Statut inconnu" });
      return;
    }
    const { count } = await prisma.idea.updateMany({
      where: { id: req.params.id },
      data: {
        ...(status !== undefined ? { status } : {}),
        ...(typeof title === "string" && title.trim() ? { title: title.trim() } : {}),
        ...(typeof description === "string" ? { description: description.trim() } : {}),
      },
    });
    res.status(count ? 200 : 404).send({ ok: !!count });
  }),
);

router.delete(
  "/:id",
  passport.authenticate("admin", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const { count } = await prisma.idea.deleteMany({ where: { id: req.params.id } });
    res.status(count ? 200 : 404).send({ ok: !!count });
  }),
);

export default router;
