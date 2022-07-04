const jwt = require("jsonwebtoken");

//models
const UserEntity = require("../models/user");

const createUser = async (req, res) => {
  if (!req.body?.username || !req.body?.firstname || !req.body?.lastname)
    return res.sendStatus(400);

  const user = new UserEntity({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    providers: res.locals.user.providers,
  });
  await user.save();

  const sessionToken = jwt.sign(
    { userId: user._id, providers: user.providers, details: user },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({ sessionToken });
};

module.exports = createUser;
