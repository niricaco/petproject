const router = require("../routes/dashboard");

const createJob = async (req, res) => {
  if (!req.body?.companyid || !req.body?.job) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyid);
  company.jobs.push(req.body.job);
  await company.save();
  res.status(200).json({ company });
};

const deleteJob = async (req, res) => {
  if (!req.body?.companyid || !req.body?.jobid) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyid);
  await company.jobs.findOneAndDelete({ _id: req.body.jobid });
  await company.save();
  res.status(200).json({ company });
};

module.exports = { createJob, deleteJob };
