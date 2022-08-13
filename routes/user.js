const express = require("express"); //fixed

const userController = require("../controllers/user");
const islogin = require("../middleware/islogin");

const router = express.Router() //fixed


router.get("/address", userController.getaddressController)
router.post("/addaddress", userController.postAddAddress)

router.get("/account", islogin, userController.getAccountController)






module.exports = router;