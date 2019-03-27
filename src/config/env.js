module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 1344,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS, 10) || 10,
  JWT_SECRET: process.env.JWT_SECRET || "fgqTlAmLPnsnufmQ",
  PG_DB: process.env.PG_DB || "user_management_db",
  PG_USER: process.env.PG_USER || "user_management_admin",
  PG_PASSWORD: process.env.PG_PASSWORD || "user_management_password",
  PG_HOST: process.env.PG_HOST || "localhost",
  PG_PORT: process.env.PG_PORT || 5432
};
