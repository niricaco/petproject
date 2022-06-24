const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  logger.error(new Error("server error"), err.tosrting());
  res
    .status(500)
    .send(
      "Server error, please try again later. Caught by errorHandler middleware"
    );
};

module.exports = errorHandler;
