const Company = require("../models/company");

// get all companies' names and ids
const getCompanyNames = async (req, res) => {
  const companies = await Company.find({}).select("name _id");
  res.status(200).json({ companies });
};

// get companies by userId in childrens
const getCompaniesByUserId = async (req, res) => {
  if (!req.body?.userId) return res.sendStatus(400);
  const userId = req.body.userId;

  const companies = await Company.find({
    $or: [
      { "roles.owners": userId },
      { "roles.admins": userId },
      { "roles.users": userId },
      { "roles.storekeepers": userId },
    ],
  });

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
      owners: req.body.userId,
    },
  });
  await company.save();
  res.status(200).json({ company });
};

module.exports = { getCompanyNames, getCompaniesByUserId, createCompany };
