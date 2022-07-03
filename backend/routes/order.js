const router = require("express").Router();
const auth = require("../middlewares/auth");

// controllers
const {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");

// these are REST endpoints
// get all orders
router.get("/", auth({ block: true }), getAllOrders);
// create an order
router.post("/", auth({ block: true }), createOrder);
// update an order
router.put("/:id", auth({ block: true }), updateOrder);
// delete an order
router.delete("/:id", auth({ block: true }), deleteOrder);

module.exports = router;
