const { HTTPError } = require("../errors");
const { logger } = require("../../config/logger");

let i = 1;

const errorHandlerMiddleware = async (ctx, next) => {
  logger.info(`REQ ${i} ${ctx.method} ${ctx.url}`, {
    body: ctx.request.body,
    ip: ctx.ip
  });
  try {
    await next();
  } catch (err) {
    if (err instanceof HTTPError) {
      ctx.body = err.toObject();
      ctx.status = err.status;
    } else if (err.isJoi) {
      ctx.status = 400;
      ctx.body = err;
    } else {
      ctx.body = { message: "Unexpected error", errorMsg: err.message, err };
      ctx.status = 500;
    }
    logger.error(err.message);
  }
  logger.info(`RES ${i} ${ctx.method} ${ctx.url}`, {
    statusCode: ctx.response.status,
    body: ctx.response.body
  });
  i += 1;
};

module.exports = {
  errorHandlerMiddleware
};
