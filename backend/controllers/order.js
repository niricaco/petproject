const router = require("express").Router();
const CompanyEntity = require("../models/company");

// get all orders
const getAllOrders = async (req, res) => {
  if (!req.body?.companyid) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyid);
  const orders = company.orders;
  res.status(200).json({ orders });
};

// create an order
const createOrder = async (req, res) => {
  if (!req.body?.companyid || !req.body?.order) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyid);
  company.orders.push(req.body.order);
  await company.save();
  res.status(200).json({ company });
};

// update an order
const updateOrder = async (req, res) => {
  if (!req.body?.companyid || !req.body?.orderid) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyid);
  const order = company.orders.id(req.body.orderid);
  order.set(req.body.order);
  await company.save();
  res.status(200).json({ company });
};

// delete an order
const deleteOrder = async (req, res) => {
  if (!req.body?.companyid || !req.body?.orderid) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyid);
  company.orders.pull(req.body.orderid);
  await company.save();
  res.status(200).json({ company });
};

module.exports = { getAllOrders, createOrder, updateOrder, deleteOrder };
