const passport = require("passport");
import * as config from "~/config";
import { Strategy as JwtStrategy } from "passport-jwt";
import type { Application, Request } from "express";
import prisma from "./prisma";

export default (app: Application) => {
  const cookieExtractor = function (req: Request) {
    // Check Authorization header first (for mobile app), then fall back to cookie
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }
    let token = req?.cookies?.["jwt"];
    return token;
  };

  passport.use(
    "user",
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: config.SECRET,
      },
      async function (jwtPayload, done) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              id: jwtPayload._id,
            },
          });
          if (user) return done(null, user);
        } catch (e) {
          console.log("error passport", e);
        }

        return done(null, false);
      },
    ),
  );
  passport.use(
    "admin",
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: config.SECRET,
      },
      async function (jwtPayload, done) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              id: jwtPayload._id,
            },
          });
          if (user && user.isAdmin) return done(null, user);
        } catch (e) {
          console.log("error passport", e);
        }

        return done(null, false);
      },
    ),
  );

  app.use(passport.initialize());
};
