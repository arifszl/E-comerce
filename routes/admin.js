const express = require("express");
const adminController = require("../controllers/admin")
const router = express.Router()
const upload = require("../utils/upload");

router.get("/add-product", adminController.addProductController)
router.post("/add", upload.single("img"), adminController.postAddProduct)


module.exports = router;