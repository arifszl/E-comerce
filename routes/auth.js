const express = require("express"); //fixed

const authController = require("../controllers/auth")

const router = express.Router() //fixed

router.get("/login", authController.getLoginController)
router.get("/signup", authController.getSignupController)



router.post("/signup", authController.postSignup)
router.post("/login", authController.postLogin)



module.exports = router;