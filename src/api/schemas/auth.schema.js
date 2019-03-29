const Joi = require("joi");

const SignInSchema = {
  body: Joi.object().keys({
    password: Joi.string()
      .min(6)
      .max(64)
      .required(),
    email: Joi.string()
      .max(256)
      .email()
      .required()
  })
};

module.exports = {
  SignInSchema
};
