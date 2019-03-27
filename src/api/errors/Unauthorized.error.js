const { HTTPError } = require("./HTTP.error");

class UnauthorizedError extends HTTPError {
  constructor(message, details) {
    super(400, message, details);
    this.name = "UnauthorizedError";
  }
}

module.exports = {
  UnauthorizedError
};
