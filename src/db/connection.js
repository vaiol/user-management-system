const knex = require("knex");
const config = require("./knexfile.js");

const TABLES = {
  USERS: "users"
};

const environment = process.env.NODE_ENV || "development";

module.exports = {
  knex: knex(config[environment]),
  TABLES
};
