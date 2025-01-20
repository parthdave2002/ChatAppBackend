const express = require("express")
const router = express.Router()
const {  PlanPaymentController } = require("../controllers/payment/paymentController");
const { CompleteOrderController } = require("../config/paypal");

router.post("/plan-payment", PlanPaymentController);
router.get("/complete-order", CompleteOrderController);

module.exports = router