const router = require("express").Router();

const { findOneAndUpdate } = require("../models/company");
// models
const CompanyEntity = require("../models/company");

const getAllItems = async (req, res) => {
  if (!req.body?.companyId) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  const items = company.items;
  res.status(200).json({ items });
};

const addItem = async (req, res) => {
  if (!req.body?.companyId || !req.body?.item) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  company.items.push(req.body.item);
  await company.save();
  res.status(200).json({ company });
};

const updateItem = async (req, res) => {
  if (!req.body?.companyId || !req.body?.item?.itemId)
    return res.sendStatus(400);
  const {
    itemId,
    name,
    partNo,
    price,
    quantity,
    discount,
    currency,
    tags,
    specializations,
    description,
    note,
    detials,
  } = req.body.item;
  const company = await CompanyEntity.findById(req.body.companyId);
  const item = await company.items.find(
    (item) => item._id.toString() === itemId
  );
  // const item = await company.items.findById(itemId);
  console.log(item);
  if (name) item.name = name;
  if (partNo) item.partNo = partNo;
  if (price) item.price = price;
  if (quantity) item.quantity = quantity;
  if (discount) item.discount = discount;
  if (currency) item.currency = currency;
  if (tags) item.tags = tags;
  if (specializations) item.specializations = specializations;
  if (description) item.description = description;
  if (note) item.note = note;
  if (detials) item.detials = detials;
  await company.save();
  res.status(200).json({ company });
};

const deleteItem = async (req, res) => {
  if (!req.body?.companyId || !req.body?.itemId) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  company.items.findOneAndDelete({ _id: req.body.itemId });
  await company.save();
  res.status(200).json({ company });
};

module.exports = { getAllItems, addItem, updateItem, deleteItem };
