const router = require("express").Router();
const auth = require("../middlewares/auth");

// controllers
const {
  getCompaniesByUserEmail,
  createCompany,
  joinCompany,
  inviteCompany,
} = require("../controllers/company");

// get companies by userId
router.post("/byuseremail", auth({ block: true }), getCompaniesByUserEmail);

// join in company
router.post("/join", auth({ block: true }), joinCompany);

// invite to company
router.post("/invite", auth({ block: true }), inviteCompany);

// create a new company
router.post("/create", auth({ block: true }), createCompany);

module.exports = router;
