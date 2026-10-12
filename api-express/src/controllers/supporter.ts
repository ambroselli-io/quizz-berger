import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import prisma from "~/prisma";
import { API_URL, EMAIL_1, SECRET, TIPIMAIL_API_KEY, TIPIMAIL_API_USER } from "~/config";
import { catchErrors } from "~/utils/error";
import { capture } from "~/utils/sentry";
import { supporterClaimLimiter } from "~/utils/rate-limit";
import { SUPPORTER_DAYS } from "~/utils/supporter";
import type { RequestWithUser } from "~/types/request";

// Tipeee has no API to check a tip: the user declares it, the admin checks the Tipeee dashboard,
// then clicks the signed link e-mailed to them. The user never sees that link.
const router = express.Router();

const PURPOSE = "supporter-claim";
const CLAIM_VALIDITY_DAYS = 30;

type ClaimPayload = { purpose: typeof PURPOSE; userId: string; pseudo: string; tipeeePseudo: string; amount: string };

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const readClaim = (token: unknown): ClaimPayload | null => {
  if (typeof token !== "string") return null;
  try {
    const payload = jwt.verify(token, SECRET) as Partial<ClaimPayload>;
    // Same SECRET as the login cookie: a login token has no purpose, so it cannot validate a claim.
    if (payload.purpose !== PURPOSE || typeof payload.userId !== "string") return null;
    return payload as ClaimPayload;
  } catch {
    return null;
  }
};

const page = (title: string, body: string) =>
  `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head>` +
  `<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:3rem auto;padding:0 1rem;line-height:1.5"><h1 style="font-size:1.4rem">${title}</h1>${body}</body></html>`;

router.post(
  "/claim",
  supporterClaimLimiter,
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    if (!req.user.pseudo) {
      res.status(403).send({ ok: false, code: "ACCOUNT_REQUIRED", error: "Il faut un compte pour déclarer un don." });
      return;
    }
    const tipeeePseudo = typeof req.body.tipeeePseudo === "string" ? req.body.tipeeePseudo.trim().slice(0, 100) : "";
    const amount = typeof req.body.amount === "string" ? req.body.amount.trim().slice(0, 20) : "";
    if (!tipeeePseudo || !amount) {
      res.status(400).send({ ok: false, error: "Indique ton pseudo Tipeee et le montant de ton don." });
      return;
    }
    const claim: ClaimPayload = { purpose: PURPOSE, userId: req.user.id, pseudo: req.user.pseudo, tipeeePseudo, amount };
    const token = jwt.sign(claim, SECRET, { expiresIn: `${CLAIM_VALIDITY_DAYS}d` });
    const link = `${API_URL}/supporter/validate?token=${encodeURIComponent(token)}`;
    const text = [
      `${req.user.pseudo} dit avoir fait un don sur Tipeee.`,
      `Pseudo Tipeee : ${tipeeePseudo}`,
      `Montant : ${amount}`,
      "",
      `Vérifie sur Tipeee, puis valide (${SUPPORTER_DAYS} jours d'accès étendu à l'IA) :`,
      link,
      "",
      `Lien valable ${CLAIM_VALIDITY_DAYS} jours.`,
    ].join("\n");

    const response = await fetch("https://api.tipimail.com/v1/messages/send", {
      method: "POST",
      headers: { "X-Tipimail-ApiUser": TIPIMAIL_API_USER!, "X-Tipimail-ApiKey": TIPIMAIL_API_KEY!, "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: TIPIMAIL_API_KEY,
        to: [{ address: EMAIL_1 }],
        msg: {
          from: { address: "contact@quizz-du-berger.com", personalName: "Le Quizz du Berger" },
          subject: `Don Tipeee déclaré par ${req.user.pseudo} (${amount})`,
          text,
        },
        // Click tracking would rewrite the validation link.
        headers: { "X-TM-TRACKING": { html: { open: 0, click: 0, text: { click: 0 } } } },
      }),
    }).catch((err) => capture(err, { extra: { userId: req.user.id } }));
    if (!response?.ok) {
      res.status(502).send({ ok: false, error: "Ta déclaration n'a pas pu être envoyée, réessaie dans quelques instants." });
      return;
    }
    res.status(200).send({ ok: true });
  }),
);

// GET only shows a button: mail scanners open links on their own, and must not validate anything.
router.get("/validate", (req: express.Request, res: express.Response) => {
  const claim = readClaim(req.query.token);
  if (!claim) {
    res.status(400).send(page("Lien invalide", "<p>Ce lien est invalide ou a expiré.</p>"));
    return;
  }
  res.send(
    page(
      "Valider un don",
      `<p><b>${escapeHtml(claim.pseudo)}</b> déclare un don de <b>${escapeHtml(claim.amount)}</b> sous le pseudo Tipeee <b>${escapeHtml(claim.tipeeePseudo)}</b>.</p>` +
        `<p>Vérifie-le sur Tipeee avant de valider : ${SUPPORTER_DAYS} jours d'accès étendu à l'IA.</p>` +
        `<form method="post" action="/supporter/validate"><input type="hidden" name="token" value="${escapeHtml(req.query.token as string)}">` +
        `<button type="submit" style="font-size:1rem;padding:.6rem 1.2rem">Valider le don</button></form>`,
    ),
  );
});

router.post(
  "/validate",
  catchErrors(async (req: express.Request, res: express.Response) => {
    const claim = readClaim(req.body.token);
    if (!claim) {
      res.status(400).send(page("Lien invalide", "<p>Ce lien est invalide ou a expiré.</p>"));
      return;
    }
    const user = await prisma.user.findUnique({ where: { id: claim.userId } });
    if (!user) {
      res.status(404).send(page("Compte introuvable", "<p>Ce compte n'existe plus.</p>"));
      return;
    }
    // Clicking twice does not stack: access runs SUPPORTER_DAYS from the last validation, or longer if it already did.
    const until = new Date(Date.now() + SUPPORTER_DAYS * 24 * 3600 * 1000);
    const supporterUntil = user.supporterUntil && user.supporterUntil > until ? user.supporterUntil : until;
    await prisma.user.update({ where: { id: user.id }, data: { supporterUntil } });
    res.send(
      page(
        "Don validé",
        `<p>${escapeHtml(user.pseudo ?? claim.pseudo)} a un accès étendu à l'IA jusqu'au ${supporterUntil.toLocaleDateString("fr-FR")}.</p>`,
      ),
    );
  }),
);

export default router;
