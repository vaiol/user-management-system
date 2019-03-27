const { TABLES } = require("../connection");
const { hashPass } = require("../../utils/bcrypt");

module.exports = {
  async seed(knex) {
    await knex(TABLES.USERS).del();
    await knex(TABLES.USERS).insert([
      {
        name: "Super",
        email: "su@test.com",
        password: await hashPass("su_test"),
        is_su: true
      },
      {
        name: "Test10",
        email: "test10@test.com",
        password: await hashPass("user_test_10")
      },
      {
        name: "Test20",
        email: "test20@test.com",
        password: await hashPass("user_test_20")
      }
    ]);
  }
};
