const { HTTPError } = require("./HTTP.error");

class DuplicationError extends HTTPError {
  constructor(message, details) {
    super(400, message, details);
    this.name = "DuplicationError";
  }
}

module.exports = {
  DuplicationError
};
