const passport = require("koa-passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { comparePass } = require('../../utils/bcrypt'); // eslint-disable-line
const { JWT_SECRET } = require("../../config/env");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {}); // eslint-disable-line

const options = { session: false };

passport.use(new LocalStrategy(options, (username, password, done) => {})); // eslint-disable-line

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {})); // eslint-disable-line

module.exports = {
  passport
};
