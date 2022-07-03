const jwt = require("jsonwebtoken");

//models
const UserEntity = require("../models/user");

const createUser = async (req, res) => {
  if (!req.body?.username || !req.body?.firstname || !req.body?.lastname)
    return res.sendStatus(400);

  const user = new UserEntity({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    providers: res.locals.user.providers,
    email: req.body.email,
  });
  console.log("user before save", user);
  await user.save();

  const sessionToken = jwt.sign(
    { userId: user._id, providers: user.providers },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.status(200).json({ sessionToken });
};

module.exports = createUser;
