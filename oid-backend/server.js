require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config");
const port = config.port;
const {
  mongo: { uri, options },
} = config;

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(
        `Template is listening on port ${port}. Run: "brew services start mongodb-community"`
      );
    });
  })
  .catch((error) => console.log(error));
