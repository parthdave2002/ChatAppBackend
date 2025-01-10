const express = require("express")
const authRoute = require("./authRoutes")
const userRoute = require("./userRoutes")
const router = express.Router()

router.use("/auth", authRoute)
router.use("/user", userRoute)

module.exports = router