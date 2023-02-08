const express = require("express");
const router = express.Router();
const ordersController = require("../controllers").orders;
const middleware = require("../middleware/index");

router.get("/:companyId/orders", ordersController.getAllOrders);
router.get("/:companyId/orders/:orderId", ordersController.getOrderById);
router.post(
  "/:companyId/orders",
  middleware.decodeToken,
  ordersController.addOrder
);
router.put(
  "/:companyId/orders/:orderId",
  middleware.decodeToken,
  ordersController.updateOrder
);
router.delete(
  "/:companyId/orders/:orderId",
  middleware.decodeToken,
  ordersController.deleteOrder
);

module.exports = router;
