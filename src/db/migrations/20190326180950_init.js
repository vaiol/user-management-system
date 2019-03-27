const { TABLES } = require("../connection");

exports.up = async knex => {
  await knex.schema.createTable(TABLES.USERS, table => {
    table.increments("id").primary();
    table.string("name", 64).notNullable();
    table
      .string("email", 256)
      .unique()
      .notNullable();
    table.string("password", 64).notNullable();
    table
      .boolean("is_su")
      .notNullable()
      .defaultTo(false);
    table.timestamps(false, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable(TABLES.USERS);
};
