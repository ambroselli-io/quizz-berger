const passport = require("passport");
const config = require("./config");
const JwtStrategy = require("passport-jwt").Strategy;

// load up the user model
const User = require("./models/user");

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
};

module.exports = (app) => {
  passport.use(
    "user",
    new JwtStrategy(
      {
        jwtFromRequest: cookieExtractor,
        secretOrKey: config.SECRET,
      },
      async function (jwtPayload, done) {
        try {
          const user = await User.findById(jwtPayload._id);
          if (user) return done(null, user);
        } catch (e) {
          console.log("error passport", e);
        }

        return done(null, false);
      }
    )
  );

  app.use(passport.initialize());
};
