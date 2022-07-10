const router = require("express").Router();
const User = require("../models/user");
const Client = require("../models/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const saltRounds = 10;

router.post("/signup", async (req, res) => {
  if (!req.body?.email || !req.body.password) return res.sendStatus(400);

  const users = await User.find({ email: req.body.email });
  if (users.length) return res.sendStatus(409);

  // hash the password
  const myPlaintextPassword = `${req.body.password}`;
  if (myPlaintextPassword.length < 4) return res.sendStatus(406);
  const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);

  await User.create({
    email: req.body.email,
    password: hashedPassword,
  });

  res.sendStatus(200);
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  if (
    !req.body?.email ||
    !req.body?.password ||
    !req.body?.client ||
    !req.body?.redirectUri
  )
    return res.sendStatus(400);

  // hash!!!
  const users = await User.find({
    email: req.body.email,
    // password: req.body.password,
  });

  const myPlaintextPassword = req.body.password;
  const hash = users[0].password;
  const result = await bcrypt.compare(myPlaintextPassword, hash);
  if (!result) return res.sendStatus(406);

  console.log(users);

  if (!users.length) return res.sendStatus(401);

  const client = await Client.findOne({ client_id: req.body.client });

  if (!client) return res.sendStatus(401);
  console.log(client.redirect_uri);
  console.log(req.body.redirectUri);
  if (client.redirect_uri !== req.body.redirectUri) return res.sendStatus(401);

  const code =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  client.users.push({
    userId: users[0]._id,
    code,
    email: users[0].email,
  });

  await client.save();

  res.json({ code });
});

router.post("/token", async (req, res) => {
  if (!req.body.code || !req.body.client_id || !req.body.client_secret)
    return res.sendStatus(400);

  const client = await Client.findOne({
    client_id: req.body.client_id,
    client_secret: req.body.client_secret,
  });

  if (!client) return res.sendStatus(401);

  const user = client.users.find((u) => u.code === req.body.code);

  if (!user) return res.sendStatus(401);

  const data = {
    userId: user.userId,
    email: user.email,
  };

  const token = jwt.sign({ sub: user.userId, header: user.email }, "shhhh", {
    expiresIn: "1h",
  });

  res.json({ id_token: token });
});

module.exports = router;
