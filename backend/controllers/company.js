const Company = require("../models/company");

// get all companies' names and ids
const getCompanyNames = async (req, res) => {
  const companies = await Company.find({}).select("name _id");
  res.status(200).json({ companies });
};

// get companies by userId in childrens
const getCompaniesByUserEmail = async (req, res) => {
  if (!req.body?.email) return res.sendStatus(400);
  const email = req.body.email;

  const companies = await Company.findOne({
    $or: [{ roles: { $elemMatch: { email } } }],
  });
  console.log(companies);

  res.status(200).json(companies);
};

// create a new company
const createCompany = async (req, res) => {
  if (!req.body?.name || !req.body?.userId) return res.sendStatus(400);
  const isCompanyExist = await Company.findOne({ name: req.body.name });
  if (isCompanyExist) return res.sendStatus(400);

  const company = new Company({
    name: req.body.name,
    roles: {
      role: req.body.role,
      userId: req.body.userId,
      email: req.body.email,
    },
  });
  await company.save();
  res.status(200).json({ company });
};

// join in company
const joinCompany = async (req, res) => {
  if (
    !req.body?.confirmationCode ||
    !req.body?.userId ||
    !req.body?.companyId ||
    !req.body?.username
  )
    return res.sendStatus(400);
  const company = await Company.findOne({ _id: req.body.companyId });
  if (!company) return res.sendStatus(400);
  const confirmationCode = company.invites.find(
    (invite) => invite.code === req.body.confirmationCode
  );
  if (!confirmationCode) return res.sendStatus(400);
  company.invites.pull({ code: req.body.confirmationCode });
  company.roles.push({
    role: "user",
    userId: req.body.userId,
    username: req.body.username,
  });
  await company.save();
  res.status(200).json({ company });
};

// invite to company
const inviteCompany = async (req, res) => {
  if (!req.body?.companyId || !req.body?.email) return res.sendStatus(400);
  const company = await Company.findOne({ _id: req.body.companyId });
  if (!company) return res.sendStatus(400);
  const invitedUser = company.invites.find(
    (invite) => invite.email === req.body.email
  );
  if (!invitedUser) return res.sendStatus(400);
  company.invites.pull({ email: req.body.email });
  company.roles.push({
    role: "user",
    email: req.body.email,
    userId: req.body.userId,
  });
  await company.save();
  res.status(200).json({ company });
};

module.exports = {
  getCompanyNames,
  getCompaniesByUserEmail,
  createCompany,
  joinCompany,
};
