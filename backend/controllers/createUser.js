const jwt = require("jsonwebtoken");

//models
const UserEntity = require("../models/user");

const createUser = async (req, res) => {
  if (!req.body?.username) return res.sendStatus(400);

  const user = await UserEntity.create({
    username: req.body.username,
    providers: res.locals.user.providers,
  });

  const sessionToken = jwt.sign(
    { userId: user._id, providers: user.providers },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({ sessionToken });
};

module.exports = createUser;
