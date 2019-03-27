const Joi = require("joi");

const CreateUserSchema = {
  body: Joi.object().keys({
    password: Joi.string()
      .min(6)
      .max(64)
      .required(),
    email: Joi.string()
      .max(256)
      .email()
      .required(),
    name: Joi.string()
      .min(2)
      .max(64)
      .required()
  })
};

const UserSchema = {
  body: Joi.object()
    .keys({
      password: Joi.string().max(64),
      email: Joi.string()
        .max(256)
        .email(),
      name: Joi.string().max(64)
    })
    .or("password", "email", "name")
};

const IdSchema = {
  params: Joi.object().keys({
    id: Joi.number()
      .integer()
      .positive()
      .required()
  })
};

const ListQuerySchema = {
  query: Joi.object().keys({
    skip: Joi.number()
      .integer()
      .min(0),
    take: Joi.number()
      .integer()
      .positive(),
    order: Joi.string().valid("name", "email", "id")
  })
};

module.exports = {
  CreateUserSchema,
  UserSchema,
  IdSchema,
  ListQuerySchema
};
