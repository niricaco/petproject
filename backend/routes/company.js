const router = require("express").Router();
const auth = require("../middlewares/auth");

// controllers
const {
  getCompanyNames,
  getCompaniesByUserId,
  createCompany,
} = require("../controllers/company");

// get companies' names and ids
router.get("/names", auth({ block: true }), getCompanyNames);

// get companies by userId
router.get("/byuserid", auth({ block: true }), getCompaniesByUserId);

// create a new company
router.post("/create", auth({ block: true }), createCompany);

module.exports = router;
