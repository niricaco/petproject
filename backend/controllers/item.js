const router = require("express").Router();

const { findOneAndUpdate } = require("../models/company");
// models
const CompanyEntity = require("../models/company");

const getAllItems = async (req, res) => {
  if (!req.body?.companyid) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyid);
  const items = company.items;
  res.status(200).json({ items });
};

const addItem = async (req, res) => {
  console.log("fasza");
  if (!req.body?.companyId || !req.body?.item) return res.sendStatus(400);
  console.log("meg mindig");
  const company = await CompanyEntity.findById(req.body.companyId);
  console.log(company);
  company.items.push(req.body.item);
  console.log(company);
  await company.save();
  res.status(200).json({ company });
};

const updateItem = async (req, res) => {
  if (!req.body?.companyid || !req.body?.item?.itemid)
    return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyid);
  company.items.findOneAndUpdate(
    { itemid: req.body.item.itemid },
    { $set: req.body.item }
  );
  await company.save();
  res.status(200).json({ company });
};

const deleteItem = async (req, res) => {
  if (!req.body?.companyid || !req.body?.itemid) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyid);
  company.items.findOneAndDelete({ _id: req.body.itemid });
  await company.save();
  res.status(200).json({ company });
};

module.exports = { getAllItems, addItem, updateItem, deleteItem };
