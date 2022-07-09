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
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/item");
const { createWork, deleteWork } = require("../controllers/work");

/* these are REST endpoints */

// get the user's detials
router.get("/", auth({ block: true }), userDetials);

// get all users
// router.get("/users", auth({ block: true }), getAllUsers);

// get the user's work and specialization
router.get(
  "/getworkandspecialization",
  auth({ block: true }),
  getWorkAndSpecialization
);

// get all users
router.post("/users", auth({ block: true }), getAllUsers);

// get all items
router.get("/items", auth({ block: true }), getAllItems);

// add a new item
router.post("/item", auth({ block: true }), addItem);

// create a work
router.post("/work", auth({ block: true }), createWork);

// set the user's work and specialization
router.post(
  "/setworkandspecialization",
  auth({ Block: true }),
  setWorkAndSpecialization
);

// update an item by id
router.put("/item", auth({ block: true }), updateItem);

// user promotion by id
router.put("/promote/", auth({ block: true }), promoteUser);

// delete a work by name
router.delete("/works/:name", auth({ block: true }), deleteWork);

// delete an item by id
router.delete("/items/:id", auth({ block: true }), deleteItem);

module.exports = router;
