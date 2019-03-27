const { HTTPError } = require("./HTTP.error");
const { DuplicationError } = require("./Duplicate.error");
const { UnauthorizedError } = require("./Unauthorized.error");
const { NotFoundError } = require("./NotFound.error");

module.exports = {
  HTTPError,
  DuplicationError,
  UnauthorizedError,
  NotFoundError
};
