const express = require("express");
const router = express.Router();
const companiesController = require("../controllers").companies;
const middleware = require("../middleware/index");

router.get("/", companiesController.getAllCompanies);
router.get("/:id", companiesController.getCompanyById);
router.post("/", middleware.decodeToken, companiesController.addCompany);
router.put("/:id", middleware.decodeToken, companiesController.updateCompany);
router.delete(
  "/:id",
  middleware.decodeToken,
  companiesController.deleteCompany
);

module.exports = router;
