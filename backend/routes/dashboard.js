const router = require("express").Router();
const auth = require("../middlewares/auth");

// contollers
const {
  userDetials,
  getAllUsers,
  promoteUser,
} = require("../controllers/user");
const {
  getWorkAndSpecialization,
  setWorkAndSpecialization,
} = require("../controllers/workAndSpecialization");
const {
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
} = require("../controllers/orders");
const {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/item");
const { createJob, deleteJob } = require("../controllers/job");

/* these are REST endpoints */

// get the user's detials
router.get("/", auth({ block: true }), userDetials);

// get all the user's orders
router.get("/orders", auth({ block: true }), allOrders);

// get one order by id
router.get("/orders/:id", auth({ block: true }), orderById);

// get all the pending orders
router.get("/orders/pending", auth({ block: true }), pendingOrders);

// get all the confirmed orders
router.get("/orders/confirmed", auth({ block: true }), confirmedOrders);

// get all the under collection orders
router.get(
  "/orders/under-collection",
  auth({ block: true }),
  ordersUnderCollection
);

// get all the collected orders
router.get("/orders/collected", auth({ block: true }), collectedOrders);

// get all the shipped orders
router.get("/orders/shipped", auth({ block: true }), shippedOrders);

// get the user's work and specialization
router.get(
  "/getworkandspecialization",
  auth({ block: true }),
  getWorkAndSpecialization
);

// get all users
router.get("/users", auth({ block: true }), getAllUsers);

// get all items
router.get("/items", auth({ block: true }), getAllItems);

// add a new item
router.post("/items", auth({ block: true }), addItem);

// create a job
router.post("/jobs", auth({ block: true }), createJob);

// set the user's work and specialization
router.post(
  "/setworkandspecialization",
  auth({ Block: true }),
  setWorkAndSpecialization
);

// create a new order
router.post("/orders", createOrder);

// router.post("/:id/todos"); // create a todo and send todo :id back

// update an item by id
router.put("/items/:id", auth({ block: true }), updateItem);

// update an order by id
router.patch("/orders/:id", auth({ block: true }), updateOrder);

// user promotion by id
router.patch("/promote/:id", auth({ block: true }), promoteUser);

// router.patch("/:id/todos/:id", controller); // update and send updated todo :id back

// router.delete("/:id", controller); // isDeleted: true ;)

// deletea job by id
router.delete("/jobs/:id", auth({ block: true }), deleteJob);

// delete an item by id
router.delete("/items/:id", auth({ block: true }), deleteItem);

// delete order by id
router.delete("/orders/:id", auth({ block: true }), deleteOrder);

module.exports = router;
