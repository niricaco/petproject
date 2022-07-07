const router = require("express").Router();
const CompanyEntity = require("../models/company");

// get all orders
const getAllOrders = async (req, res) => {
  if (!req.body?.companyId) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  const orders = company.orders;
  res.status(200).json({ orders });
};

// create an order
const createOrder = async (req, res) => {
  if (!req.body?.companyId || !req.body?.order) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  company.orders.push(req.body.order);
  await company.save();
  res.status(200).json({ company });
};

// update an order
const updateOrder = async (req, res) => {
  if (!req.body?.companyId || !req.body?.order.orderId)
    return res.sendStatus(400);
  const { companyId, order } = req.body;
  const { orderId, confirmed, isCollected, orderList } = order;
  const { itemId, name, quantity } = orderList[0];
  const company = await CompanyEntity.findById(companyId);
  const specificOrder = await company.orders.find(
    (order) => order._id.toString() === orderId
  );
  const orderListItem = await specificOrder.orderList.find(
    (item) => item.itemId.toString() === itemId
  );
  if (itemId) orderListItem.itemId = itemId;
  if (name) orderListItem.name = name;
  if (quantity) orderListItem.quantity = quantity;
  if (itemId || name || quantity) {
    specificOrder.confirmed = false;
    specificOrder.isCollected = false;
  }
  if (confirmed) specificOrder.confirmed = true;
  await company.save();
  res.status(200).json({ company });
};

// delete an order
const deleteOrder = async (req, res) => {
  if (!req.body?.companyId || !req.body?.orderId) return res.sendStatus(400);
  const company = await CompanyEntity.findById(req.body.companyId);
  company.orders.pull(req.body.orderId);
  await company.save();
  res.status(200).json({ company });
};

module.exports = { getAllOrders, createOrder, updateOrder, deleteOrder };
