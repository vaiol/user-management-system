const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/env");

const hashPass = async password => {
  if (!password) {
    return undefined;
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

const comparePass = (userPassword, databasePassword) => {
  return bcrypt.compare(userPassword, databasePassword);
};

module.exports = {
  hashPass,
  comparePass
};
