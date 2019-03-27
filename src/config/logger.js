const { createLogger, format, transports } = require("winston");

const options = {
  console: {
    level: "debug",
    handleExceptions: true,
    format: format.combine(format.colorize(), format.simple())
  }
};

module.exports = {
  logger: createLogger({
    transports: [new transports.Console(options.console)],
    exitOnError: false
  })
};
