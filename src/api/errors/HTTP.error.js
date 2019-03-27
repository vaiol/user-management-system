class HTTPError extends Error {
  constructor(statusCode, message, details) {
    super(message);
    this.name = "HTTPError";
    this.status = statusCode || 400;
    this.details = details;
  }

  toObject() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.status,
      details: this.details
    };
  }
}

module.exports = {
  HTTPError
};
