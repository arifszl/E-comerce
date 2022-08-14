const express = require("express"); //fixed

const authController = require("../controllers/auth");
const islogin = require("../middleware/islogin");

const router = express.Router() //fixed

router.get("/login", authController.getLoginController)
router.get("/signup", authController.getSignupController)
router.get("/mail", authController.getMailController)



router.post("/signup", authController.postSignup)
router.post("/login", authController.postLogin)
router.post("/logout", islogin, authController.postLogout)
router.post("/mail", authController.postMail)


module.exports = router;