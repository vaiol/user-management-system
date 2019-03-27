const { HTTPError } = require("./HTTP.error");

class NotFoundError extends HTTPError {
  constructor(message, details) {
    super(404, message, details);
    this.name = "NotFoundError";
  }
}

module.exports = {
  NotFoundError
};
