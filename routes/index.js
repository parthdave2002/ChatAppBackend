const express = require("express")
const authRoute = require("./authRoutes")
const userRoute = require("./userRoutes");
const paymentRoute = require("./paymentRoute");
const router = express.Router()

router.use("/auth", authRoute)
router.use("/user", userRoute)
router.use("/payment", paymentRoute)

module.exports = router