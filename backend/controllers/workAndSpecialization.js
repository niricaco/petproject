const router = require("express").Router();
const UserEntity = require("../models/user");

// get the user's work and specialization
const getWorkAndSpecialization = async (req, res) => {
  const user = await UserEntity.findById(res.locals.user.userId);
  res.status(200).json({ user });
};

// got job and specialization in body
// save it to mongoDB
// return response with the user's job and specialization
const setWorkAndSpecialization = async (req, res) => {
  if (!req.body?.work || !req.body?.specialization)
    return res
      .status(400)
      .json({ error: "Please provide work and specialization" });
  const user = await UserEntity.findById(res.locals.userId);
  user.workAndSpecialization.work = req.body.work;
  user.workAndSpecialization.specialization = req.body.specialization;
  await user.save();
  res.status(200).json({ user });
};

module.exports = { getWorkAndSpecialization, setWorkAndSpecialization };
