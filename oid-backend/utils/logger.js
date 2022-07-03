const pino = require("pino");
const { createPinoBrowserSend, createWriteStream } = require("pino-logflare");
const config = require("../config");
const { logflare } = config;

const stream = createWriteStream({
  apiKey: logflare.apiKey,
  sourceToken: logflare.sourceToken,
});

// create pino-logflare browser stream
const send = createPinoBrowserSend({
  apiKey: logflare.apiKey,
  sourceToken: logflare.sourceToken,
});

// create pino loggger
const logger = pino(
  {
    browser: {
      transmit: {
        send: send,
      },
    },
  },
  stream
);

module.exports = logger;
