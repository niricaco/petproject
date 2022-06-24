const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");

const corsOptions = {
  origin: process.env.APP_URL, // a FE localhost kell ide
  optionsSuccessStatus: 200,
};

/* morgan.token("host", function (req, res) {
  return req.hostname;
}); */

app.use(cors(corsOptions));
app.use(express.json()); // parse json what arrive in body
app.use(morgan("tiny")); // use this middleware on every request
/* app.use(morgan(":method :url :status - HOST: :host  - :response-time ms")); // use this middleware on every request */

// routes
const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboards", dashboardRoutes);
const userRoutes = require("./routes/user.js");
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  console.log("Health check completed");
  res.sendStatus(200);
});

app.use(errorHandler);

module.exports = app;
