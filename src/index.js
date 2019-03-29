const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const { logger } = require("./config/logger");
const { PORT, NODE_ENV } = require("./config/env");
const { router } = require("./api/routes");
const {
  errorHandlerMiddleware,
  passportMiddleware
} = require("./api/middlewares");

const app = new Koa();

app
  .use(bodyParser())
  .use(errorHandlerMiddleware)
  .use(passportMiddleware)
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app.listen(PORT, () => {
  logger.debug(`HTTP Server listening on port: ${PORT}`);
  logger.debug(`Environment: ${NODE_ENV}`);
});
