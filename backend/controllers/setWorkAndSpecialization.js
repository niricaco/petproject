// got job and specialization in body
// save it to mongoDB
// return response with the user's job and specialization

const router = require("express").Router();
const User = require("../models/user");

const setWorkAndSpecialization = async (req, res) => {
  if (!req.body?.work || !req.body?.specialization)
    return res
      .status(400)
      .json({ error: "Please provide work and specialization" });
  const user = await User.findById(res.locals.user.userId);
  user.workAndSpecialization.work = req.body.work;
  user.workAndSpecialization.specialization = req.body.specialization;
  await user.save();
  res.status(200).json({ user });
};

modules.exports = setWorkAndSpecialization;
