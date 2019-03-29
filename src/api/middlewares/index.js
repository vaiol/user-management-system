const { errorHandlerMiddleware } = require("./errorHandler.middleware");
const { passportMiddleware } = require("./passport.middleware");
const { validate } = require("./validation.middleware");
const { jwtAuthMiddleware, localAuthMiddleware } = require("./auth.middleware");

module.exports = {
  errorHandlerMiddleware,
  passportMiddleware,
  validate,
  jwtAuthMiddleware,
  localAuthMiddleware
};
