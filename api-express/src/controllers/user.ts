import express from "express";
import passport from "passport";
import md5 from "md5";
import jwt from "jsonwebtoken";
import { catchErrors } from "~/utils/error";
import { sanitizeUser } from "~/utils/user";
import prisma from "~/prisma";
import { ENVIRONMENT, SECRET } from "~/config";
import type { User } from "@prisma/client";
import { RequestWithUser } from "~/types/request";

const router = express.Router();

const JWT_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days in ms
const JWT_MIN_AGE = 1000 * 60 * 60 * 3; // 3 hours in ms

function cookieOptions(user?: User | null) {
  const maxAge = user?.pseudo ? JWT_MAX_AGE : JWT_MIN_AGE;
  if (ENVIRONMENT === "development") {
    return { maxAge, httpOnly: true, secure: true, sameSite: "none" as const };
  } else {
    return { maxAge, httpOnly: true, secure: true, domain: ".quizz-du-berger.com", sameSite: "lax" as const };
  }
}

function logoutCookieOptions() {
  if (ENVIRONMENT === "development") {
    return { httpOnly: true, secure: true, sameSite: "none" as const };
  } else {
    return { httpOnly: true, secure: true, domain: ".quizz-du-berger.com", sameSite: "lax" as const };
  }
}

const setCookie = (req: express.Request, res: express.Response, user: User) => {
  const maxAge = user?.pseudo ? JWT_MAX_AGE : JWT_MIN_AGE;
  const token = jwt.sign({ _id: user.id }, SECRET, { expiresIn: maxAge });
  res.cookie("jwt", token, cookieOptions(user));
};

router.post(
  "/",
  catchErrors(async (req: express.Request, res: express.Response) => {
    console.log("CREATE");
    const user = await prisma.user.create({
      data: { password: "" },
    });

    setCookie(req, res, user);

    res.status(200).send({ ok: true, data: sanitizeUser(user) });
  }),
);

router.post(
  "/signup",
  catchErrors(async (req: express.Request, res: express.Response) => {
    if (!req.body.pseudo) {
      res.status(400).send({ ok: false, error: "Veuillez fournir un pseudo" });
      return;
    }
    if (!req.body.password) {
      res.status(400).send({ ok: false, error: "Veuillez fournir un mot-de-passe" });
      return;
    }
    if (!req.body.passwordConfirm) {
      res.status(400).send({ ok: false, error: "Veuillez confirmer votre mot-de-passe" });
      return;
    }
    if (req.body.pseudo.length < 3) {
      res.status(400).send({ ok: false, error: "Votre pseudo doit faire au moins 3 lettres" });
      return;
    }

    const checkPseudo = await prisma.user.findFirst({ where: { pseudo: req.body.pseudo } });

    if (checkPseudo !== null) {
      res.status(400).send({ ok: false, error: "Ce pseudonyme existe déjà" });
      return;
    }

    if (req.body.password !== req.body.passwordConfirm) {
      res.status(400).send({ ok: false, error: "Les mots-de-passes ne sont pas identiques" });
      return;
    }

    console.log("CREATE");

    const user = await prisma.user.create({
      data: {
        pseudo: req.body.pseudo,
        isPublic: req.body.isPublic ?? false,
        password: md5(req.body.password),
      },
    });

    setCookie(req, res, user);

    res.status(200).send({ ok: true, data: sanitizeUser(user) });
  }),
);

router.post(
  "/login",
  catchErrors(async (req: express.Request, res: express.Response) => {
    if (!req.body.pseudo) {
      res.status(400).send({ ok: false, error: "Veuillez fournir un pseudo" });
      return;
    }
    if (!req.body.password) {
      res.status(400).send({ ok: false, error: "Veuillez fournir un mot-de-passe" });
      return;
    }

    const user = await prisma.user.findFirst({ where: { pseudo: req.body.pseudo } });
    if (!user) {
      res.status(400).send({ ok: false, error: "Ce compte n'existe pas" });
      return;
    }
    if (user.isCandidate) {
      res.status(400).send({ ok: false, error: "Ce compte est protégé ! Veuillez nous contacter si vous vous sentez concerné" });
      return;
    }

    if (md5(req.body.password) !== user.password) {
      res.status(400).send({ ok: false, error: "Le pseudo et/ou le mot-de-passe sont incorrects" });
      return;
    }

    setCookie(req, res, user);

    res.status(200).send({ ok: true, data: sanitizeUser(user) });
  }),
);

router.get(
  "/signin_token",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const user = req.user!;
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    res.send({ ok: true, user: sanitizeUser(user) });
  }),
);

router.post(
  "/logout",
  catchErrors(async (req: express.Request, res: express.Response) => {
    res.clearCookie("jwt", logoutCookieOptions());
    res.status(200).send({ ok: true });
  }),
);

router.put(
  "/",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const user = req.user!;
    const userUpdate: {
      updatedAt?: Date;
      pseudo?: string;
      password?: string;
      isPublic?: boolean;
      themes?: string[];
      firstName?: string;
      lastName?: string;
      partyName?: string;
    } = { updatedAt: new Date() };

    if (req.body.hasOwnProperty("pseudo")) {
      if (req.body.pseudo.length < 3) {
        res.status(400).send({ ok: false, error: "Votre pseudo doit faire au moins 3 lettres" });
        return;
      }
      if (user.pseudo !== req.body.pseudo) {
        const checkPseudo = await prisma.user.findFirst({ where: { pseudo: req.body.pseudo } });
        if (checkPseudo !== null) {
          res.status(400).send({ ok: false, error: "Ce pseudonyme existe déjà" });
          return;
        }
        userUpdate.pseudo = req.body.pseudo;
      }
    }
    if (req.body.hasOwnProperty("password")) userUpdate.password = md5(req.body.password);
    // not activated automatically, manual change only
    // if (req.body.hasOwnProperty("isCandidate")) userUpdate.isCandidate = req.body.isCandidate;
    if (req.body.hasOwnProperty("isPublic")) userUpdate.isPublic = req.body.isPublic;
    if (req.body.hasOwnProperty("themes")) userUpdate.themes = req.body.themes;
    if (req.body.hasOwnProperty("firstName")) userUpdate.firstName = req.body.firstName;
    if (req.body.hasOwnProperty("lastName")) userUpdate.lastName = req.body.lastName;
    if (req.body.hasOwnProperty("partyName")) userUpdate.partyName = req.body.partyName;

    console.log(JSON.stringify({ userUpdate }));

    // Handle friends separately using Prisma relations
    let updatedUser: User;
    if (req.body.hasOwnProperty("friends") && Array.isArray(req.body.friends)) {
      updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          ...userUpdate,
          friends: {
            set: req.body.friends.map((friendId: string) => ({ id: friendId })),
          },
        },
      });
    } else {
      updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: userUpdate,
      });
    }

    res.status(200).send({ ok: true, data: sanitizeUser(updatedUser) });
  }),
);

router.post(
  "/me",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: RequestWithUser, res: express.Response) => {
    const user = req.user!;
    res.status(200).send({ ok: true, user: sanitizeUser(user) });
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
  }),
);

router.get(
  "/friends/:pseudo",
  passport.authenticate("user", { session: false }),
  catchErrors(async (req: express.Request, res: express.Response) => {
    if (!req.params.pseudo) {
      res.status(400).send({ ok: false });
      return;
    }
    const user = await prisma.user.findFirst({ where: { pseudo: req.params.pseudo } });
    if (!user) {
      res.status(200).send({ ok: false });
      return;
    }
    if (!(user.isPublic || user.isCandidate)) {
      res.status(200).send({ ok: false, code: "NOT_PUBLIC" });
      return;
    }

    res.status(200).send({ ok: true, data: sanitizeUser(user) });
  }),
);

router.get(
  "/:pseudo",
  catchErrors(async (req: express.Request, res: express.Response) => {
    if (!req.params.pseudo) {
      res.status(400).send({ ok: false });
      return;
    }
    const user = await prisma.user.findFirst({ where: { pseudo: req.params.pseudo.split("?")[0] } });
    if (!user) {
      res.status(404).send({ ok: false });
      return;
    }
    if (!(user.isPublic || user.isCandidate)) {
      if (req.query.ssr !== "true") {
        res.status(404).send({ ok: false });
        return;
      }
    }

    res.status(200).send({ ok: true, data: sanitizeUser(user) });
  }),
);

export default router;
