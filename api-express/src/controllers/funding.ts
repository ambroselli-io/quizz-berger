import express from "express";
import passport from "passport";
import prisma from "~/prisma";
import { catchErrors } from "~/utils/error";
import type { RequestWithUser } from "~/types/request";

// Public money summary for /soutenir. Donations and non-AI expenses are typed in by the admin;
// the AI cost is the live sum of what each conversation cost (Chat.costEur).
const router = express.Router();

router.get(
  "/summary",
  catchErrors(async (_req: express.Request, res: express.Response) => {
    const [donations, expenses, ai] = await Promise.all([
      prisma.ledgerEntry.aggregate({ where: { kind: "donation" }, _sum: { amountEur: true }, _count: true }),
      prisma.ledgerEntry.findMany({ where: { kind: "expense" }, orderBy: { date: "desc" } }),
      prisma.chat.aggregate({ _sum: { costEur: true } }),
    ]);
    const donationsEur = donations._sum.amountEur ?? 0;
    const aiEur = ai._sum.costEur ?? 0;
    const otherExpensesEur = expenses.reduce((sum, e) => sum + e.amountEur, 0);
    res.status(200).send({
      ok: true,
      data: {
        donationsEur,
        donationsCount: donations._count,
        aiEur,
        expenses: expenses.map((e) => ({ id: e.id, date: e.date, label: e.label, amountEur: e.amountEur })),
        spentEur: aiEur + otherExpensesEur,
        remainingEur: donationsEur - aiEur - otherExpensesEur,
      },
    });
  }),
);

// Admin only: every entry, donations included (their labels name the donor, so they stay private).
router.get(
  "/ledger",
  passport.authenticate("admin", { session: false }),
  catchErrors(async (_req: RequestWithUser, res: express.Response) => {
    const entries = await prisma.ledgerEntry.findMany({ orderBy: { date: "desc" } });
    res.status(200).send({ ok: true, data: entries });
  }),
);

router.post(
  "/ledger",
  passport.authenticate("admin", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const { kind, label, date } = req.body;
    const amountEur = Number(req.body.amountEur);
    if (!["donation", "expense"].includes(kind) || !(amountEur > 0) || typeof label !== "string" || !label.trim()) {
      res.status(400).send({ ok: false, error: "Type, montant positif et libellé obligatoires" });
      return;
    }
    const entry = await prisma.ledgerEntry.create({
      data: { kind, amountEur, label: label.trim(), date: date ? new Date(date) : new Date() },
    });
    res.status(200).send({ ok: true, data: entry });
  }),
);

router.delete(
  "/ledger/:id",
  passport.authenticate("admin", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const { count } = await prisma.ledgerEntry.deleteMany({ where: { id: req.params.id } });
    res.status(count ? 200 : 404).send({ ok: !!count });
  }),
);

export default router;
