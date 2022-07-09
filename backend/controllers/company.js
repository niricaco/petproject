const Company = require("../models/company");

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
  console.log("req.body", req.body);
  if (
    // !req.body?.confirmationCode ||
    !req.body?.userId ||
    // !req.body?.companyId ||
    !req.body?.email
  )
    return res.sendStatus(400);
  // find a company by email within invites
  const company = await Company.findOne({
    invites: { $elemMatch: { email: req.body.email } },
  });
  console.log("company ", company);

  if (!company) return res.sendStatus(400);
  // const confirmationCode = company.invites.find(
  //   (invite) => invite.code === req.body.confirmationCode
  // );
  // if (!confirmationCode) return res.sendStatus(400);
  const invite = company.invites.filter(
    (invite) => invite.email === req.body.email
  );
  console.log("invite ", invite);
  if (!invite) return res.sendStatus(400);
  await company.invites.pull(invite);
  console.log("company.invites ", company.invites);

  await company.roles.push({
    role: "user",
    userId: req.body.userId,
    email: req.body.email,
  });
  console.log("company.roles ", company.roles);
  console.log("company ", company);
  await company.save();
  res.status(200).json({ company });
};

// invite to company
const inviteCompany = async (req, res) => {
  if (!req.body?.companyId || !req.body?.email) return res.sendStatus(400);
  const company = await Company.findOne({ _id: req.body.companyId });
  if (!company) return res.sendStatus(400);
  const invitedUser = await company.invites.find(
    (invite) => invite.email === req.body.email
  );
  if (invitedUser) return res.sendStatus(400);
  company.invites.push({ email: req.body.email });
  await company.save();
  res.status(200).json({ company });
};

module.exports = {
  getCompaniesByUserEmail,
  createCompany,
  joinCompany,
  inviteCompany,
};
