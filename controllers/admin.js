const Product = require("../model/product")

exports.addProductController = (req, res) => {
    res.render("addProduct", { title: "add new product" });
}

exports.postAddProduct = (req, res) => {
    const pathImg = req.file.filename;
    // return console.log(req.file)

    const p1 = new Product({
        productName: req.body.name,
        price: req.body.price,
        imgurl: pathImg,
        cateogaries: req.body.cateogaries,
        description: req.body.desc
    })
    p1.save();
    res.redirect("/")
}