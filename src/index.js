const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const { router } = require("./api/routes");
const { logger } = require("./config/logger");
const { PORT, NODE_ENV } = require("./config/env");
const { passport } = require("./api/middlewares/passport.middleware");
const {
  errorHandlerMiddleware
} = require("./api/middlewares/errorHandler.middleware");

const app = new Koa();

app
  .use(bodyParser())
  .use(errorHandlerMiddleware)
  .use(passport.initialize())
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app.listen(PORT, () => {
  logger.debug(`HTTP Server listening on port: ${PORT}`);
  logger.debug(`Environment: ${NODE_ENV}`);
});
