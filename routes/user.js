const express = require("express"); //fixed

const userController = require("../controllers/user")

const router = express.Router() //fixed

router.get("/cart", userController.getcartController)
router.get("/checkout", userController.getcheckoutController)
router.get("/order", userController.getorderController)






module.exports = router;