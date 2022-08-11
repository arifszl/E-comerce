const express = require("express"); //fixed

const productController = require("../controllers/products")
const router = express.Router() //fixed
router.get("/", productController.homeController)

router.get("/contact", productController.contactController)


router.get("/services", productController.servicesController)
router.get("/products/:cat", productController.productListController)
router.get("/pp/:pid", productController.productDetailController)

module.exports = router; //fixed