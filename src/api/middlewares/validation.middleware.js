const Joi = require("joi");

function validate(schema) {
  return (ctx, next) => {
    if (schema.body) {
      ctx.request.body = Joi.attempt(
        ctx.request.body,
        schema.body,
        "validation error"
      );
    }
    if (schema.query) {
      ctx.request.query = Joi.attempt(
        ctx.request.query,
        schema.query,
        "validation error"
      );
    }
    if (schema.params) {
      ctx.params = Joi.attempt(ctx.params, schema.params, "validation error");
    }
    return next();
  };
}

module.exports = {
  validate
};
