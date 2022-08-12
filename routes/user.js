const express = require("express"); //fixed

const userController = require("../controllers/user");
const islogin = require("../middleware/islogin");

const router = express.Router() //fixed


router.get("/checkout", userController.getcheckoutController)
router.get("/order", userController.getorderController)

router.get("/account", islogin, userController.getAccountController)






module.exports = router;