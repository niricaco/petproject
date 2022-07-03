const router = require("express").Router();
const UserEntity = require("../models/user");
const CompanyEntity = require("../models/company");

const userDetials = async (req, res) => {
  if (!req.body?.userid)
    return res.status(400).json({ error: "Please provide userid" });
  const user = await UserEntity.findById(req.body.userid);
  const company = await CompanyEntity.findById(user._id);
  const role = await company.findById(user._id);
  const userDetials = {
    userid: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    companyid: company._id,
    companyname: company.companyname,
    role,
  };
  res.status(200).json({ userDetials });
};

const getAllUsers = async (req, res) => {
  if (!req.body?.companyid) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyid);
  const users = await UserEntity.findById({ $in: company.users });
  res.status(200).json({ users });
};

const promoteUser = async (req, res) => {
  if (!req.body?.userid || !req.body?.companyid) return res.sendStatus(400);
  const role = req.body.role;
  const company = await CompanyEntity.findById(req.body.companyid);
  await company.roles.findAndDelete({ _id: req.body.userid });
  await company.roles.role.push(req.body.userid);
  await company.save();
  res.status(200).json({ company });
};

module.exports = { userDetials, getAllUsers, promoteUser };
