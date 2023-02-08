const express = require("express");
const router = express.Router();
const companiesRouter = require("./companies");
const ordersRouter = require("./orders");
const usersRouter = require("./users");

router.use("/companies", companiesRouter);
router.use("/companies", ordersRouter);
router.use("/users", usersRouter);

module.exports = router;
