const router = require("express").Router();
const UserEntity = require("../models/user");
const CompanyEntity = require("../models/company");

const userDetials = async (req, res) => {
  if (!req.body?.userId)
    return res.status(400).json({ error: "Please provide userId" });
  const user = await UserEntity.findById(req.body.userId);
  const company = await CompanyEntity.findOne({
    $or: [{ roles: { $elemMatch: { userId: req.body.userId } } }],
  });
  const role = await company.roles.find(
    (role) => role.userId.toString() === req.body.userId.toString()
  );
  const userDetials = {
    userId: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    companyId: company._id,
    companyname: company.name,
    role: role.role,
  };
  res.status(200).json({ userDetials });
};

const getAllUsers = async (req, res) => {
  if (!req.body?.companyId) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  const users = await UserEntity.findById({ $in: company.users });
  res.status(200).json({ users });
};

const promoteUser = async (req, res) => {
  if (!req.body?.userId || !req.body?.companyId || !req.body?.role)
    return res.sendStatus(400);
  const role = req.body.role;
  const company = await CompanyEntity.findById(req.body.companyId);
  await company.roles.findOneAndUpdate(
    { userId: req.body.userId },
    { $set: { role } },
    { new: true }
  );
  await company.save();
  res.status(200).json({ company });
};

module.exports = { userDetials, getAllUsers, promoteUser };
