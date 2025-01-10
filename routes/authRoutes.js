const express = require("express")
const router = express.Router()
const {
    LoginController,
    ForgotpasswordController,
    VetifylinkController,
    ResetPasswordController,
} = require("../controllers/auth/authController")

router.post("/login", LoginController);
router.post("/forgot-password", ForgotpasswordController);
router.post("/verify-token", VetifylinkController);
router.post("/reset-password", ResetPasswordController);

module.exports = router