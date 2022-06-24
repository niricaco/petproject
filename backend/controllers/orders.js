const router = require("express").Router();
const CompanyEntity = require("../models/company");
const OrderEntity = require("../models/order");

const allOrders = async (req, res) => {
  if (!req.body?.userid || !req.body?.companyid) return res.sendStatus(406);
  const user = req.body.userid;
  const company = await CompanyEntity.findById(req.body.companyid);
  const orders = await OrderEntity.findById({ $in: company.orders });
  res.status(200).json({ orders });
};

const orderById = async (req, res) => {
  if (!req.body?.userid || !req.body?.orderid) return res.sendStatus(406);
  const user = req.body.userid;
  const order = await OrderEntity.findById(req.body.orderid);
  res.status(200).json({ order });
};

const pendingOrders = async (req, res) => {
  if (!req.body?.userid || !req.body?.companyid) return res.sendStatus(406);
  const user = req.body.userid;
  const company = await CompanyEntity.findById(req.body.companyid);
  const orders = await OrderEntity.findById.and(
    { $in: company.orders },
    { confirmed: false }
  );
  res.status(200).json({ orders });
};

const confirmedOrders = async (req, res) => {
  if (!req.body?.userid || !req.body?.companyid) return res.sendStatus(406);
  const user = req.body.userid;
  const company = await CompanyEntity.findById(req.body.companyid);
  const orders = await OrderEntity.findById.and(
    { $in: company.orders },
    { confirmed: true }
  );
  res.status(200).json({ orders });
};

const ordersUnderCollection = async (req, res) => {
  if (!req.body?.userid || !req.body?.companyid) return res.sendStatus(406);
  const user = req.body.userid;
  const company = await CompanyEntity.findById(req.body.companyid);
  const orders = await OrderEntity.findById.and(
    { $in: company.orders },
    { confirmed: true, collected: false }
  );
  res.status(200).json({ orders });
};

const collectedOrders = async (req, res) => {
  if (!req.body?.userid || !req.body?.companyid) return res.sendStatus(406);
  const user = req.body.userid;
  const company = await CompanyEntity.findById(req.body.companyid);
  const orders = await OrderEntity.findById.and(
    { $in: company.orders },
    { collected: true }
  );
  res.status(200).json({ orders });
};

const shippedOrders = async (req, res) => {
  if (!req.body?.userid || !req.body?.companyid) return res.sendStatus(406);
  const user = req.body.userid;
  const company = await CompanyEntity.findById(req.body.companyid);
  const orders = await OrderEntity.findById.and(
    { $in: company.orders },
    { shipped: true }
  );
  res.status(200).json({ orders });
};

const createOrder = async (req, res) => {
  if (!req.body?.userid || !req.body?.companyid) return res.sendStatus(406);
  const user = req.body.userid;
  const company = await CompanyEntity.findById(req.body.companyid);
  const order = await OrderEntity.create(req.body.order);
  company.orders.push(order);
  await company.save();
  res.status(200).json({ order });
};

const updateOrder = async (req, res) => {
  if (!req.body?.userid || !req.body?.orderid) return res.sendStatus(406);
  const user = req.body.userid;
  const order = await OrderEntity.findById(req.body.orderid);
  order.set(req.body.order);
  await order.save();
  res.status(200).json({ order });
};

const deleteOrder = async (req, res) => {
  if (!req.body?.orderid) return res.sendStatus(406);
  const order = await OrderEntity.findById(req.body.orderid);
  await order.remove();
  res.status(200).json({ order });
};

module.exports = {
  allOrders,
  orderById,
  pendingOrders,
  confirmedOrders,
  ordersUnderCollection,
  collectedOrders,
  shippedOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
