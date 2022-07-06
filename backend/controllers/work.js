const router = require("../routes/dashboard");
const CompanyEntity = require("../models/company");

const createWork = async (req, res) => {
  if (!req.body?.companyId || !req.body?.work) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  console.log(company);
  console.log("company.works before push: ", company.works);
  company.works.push(req.body.work);
  console.log("company.works after push: ", company.works);
  await company.save();
  res.status(200).json({ company });
};

const deleteWork = async (req, res) => {
  if (!req.body?.companyId || !req.body?.workid) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  await company.works.findOneAndDelete({ _id: req.body.workid });
  await company.save();
  res.status(200).json({ company });
};

module.exports = { createWork, deleteWork };
