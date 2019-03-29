const passport = require("koa-passport");
const { UnauthorizedError } = require("../errors");

const jwtAuthMiddleware = async (ctx, next) => {
  await passport.authenticate("jwt", (err, user) => {
    if (!user || err) {
      throw new UnauthorizedError("User unauthorized!");
    }
    ctx.state.user = user;
  })(ctx);
  return next();
};

const localAuthMiddleware = async (ctx, next) => {
  await passport.authenticate("local", (err, user) => {
    if (err || !user) {
      throw new UnauthorizedError("User unauthorized!");
    }
    ctx.state.user = user;
  })(ctx);
  return next();
};

module.exports = {
  jwtAuthMiddleware,
  localAuthMiddleware
};
