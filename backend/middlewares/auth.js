const jwt = require("jsonwebtoken");

const auth =
  ({ block }) =>
  (req, res, next) => {
    const token = req.header("authorization");
    if (!token && block) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err && block) return res.sendStatus(401);
      res.locals.user = payload;
      next();
    });
  };

module.exports = auth;
