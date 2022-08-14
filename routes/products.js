const express = require("express"); //fixed

const productController = require("../controllers/products");
const islogin = require("../middleware/islogin");
const router = express.Router() //fixed

router.get("/", productController.homeController)

router.get("/contact", productController.contactController)

router.get("/cart", islogin, productController.getcartController)
router.get("/services", productController.servicesController)
router.get("/products/:cat", productController.productListController)
router.get("/productdetail", productController.productDetailController)
router.get("/confirmedorder", islogin, productController.getconfirmedorderController)
router.get("/order", islogin, productController.getorderController)
router.get("/trackorder", islogin, productController.gettrackOrderController)
router.get("/search", productController.getsearch)

router.post("/addcart", islogin, productController.postCart)
router.post("/removeQty", islogin, productController.postremoveQty)
router.post("/removeFromCart", islogin, productController.postremoveFromCart)
router.post("/confirmorder", islogin, productController.postConfirmOrder)
router.post("/cancelorder", islogin, productController.postcancelorder)
router.post("/invoice", islogin, productController.postinvoice)

module.exports = router; //fixed