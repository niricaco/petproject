const router = require("express").Router();
const Client = require("../models/client");
const config = require("../config");

router.post("/register", async (req, res) => {
  if (req.get("authorization") !== config.adminSecret)
    return res.sendStatus(401);

  await Client.create({
    client_id: req.body.client_id,
    client_secret: req.body.client_secret,
    redirect_uri: req.body.redirect_uri,
  });
  res.sendStatus(200); // = {user: user}
}); // display the user's all dashboards

module.exports = router;
