const router = require("../routes/dashboard");
const CompanyEntity = require("../models/company");

const createWork = async (req, res) => {
  if (!req.body?.companyId || !req.body?.work) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  company.works.push(req.body.work);
  await company.save();
  res.status(200).json({ company });
};

const deleteWork = async (req, res) => {
  if (!req.body?.companyId || !req.body?.work) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  company.works.pull(req.body.work);
  await company.save();
  res.status(200).json({ company });
};

module.exports = { createWork, deleteWork };
