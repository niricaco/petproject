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
const { createJob, deleteJob } = require("../controllers/job");

/* these are REST endpoints */

// get the user's detials
router.get("/", auth({ block: true }), userDetials);

// get all users
router.get("/users", auth({ block: true }), getAllUsers);

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

// update an item by id
router.put("/items/:id", auth({ block: true }), updateItem);

// user promotion by id
router.patch("/promote/:id", auth({ block: true }), promoteUser);

// deletea job by id
router.delete("/jobs/:id", auth({ block: true }), deleteJob);

// delete an item by id
router.delete("/items/:id", auth({ block: true }), deleteItem);

module.exports = router;
