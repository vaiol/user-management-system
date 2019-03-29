const passport = require("koa-passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { comparePass } = require('../../utils/bcrypt'); // eslint-disable-line
const { JWT_SECRET } = require("../../config/env");
const { getUser, getFullUser } = require("../../db/queries/users");
const { logger } = require("../../config/logger");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [user] = await getUser(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const options = { session: false, usernameField: "email" };

passport.use(
  new LocalStrategy(options, async (email, password, done) => {
    try {
      const [user] = await getFullUser(email);
      if (user && (await comparePass(password, user.password))) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      logger.error(err.message);
      return done(err);
    }
  })
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const [user] = await getUser(payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      logger.error(err.message);
      return done(err);
    }
  })
);

module.exports = {
  passportMiddleware: passport.initialize()
};
