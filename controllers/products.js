const Product = require("../model/product")

exports.homeController = async(req, res) => { //change only variable(homeController)
    const products = await Product.find();
    // return console.log(products)
    res.render("index", { title: "Home", products: products });
}

exports.contactController = (req, res) => {
    res.render("contact", { title: "Contact" });
}

exports.productDetailController = async(req, res) => {

    const prodId = req.params.pid;
    return console.log(prodId)
    Product.findById(prodId)
        .then(product => {
            res.render("productDetail", {
                product: product,
                title: product.title,
                path: '/products'
            });
        })
        .catch(err => console.log(err));
}

exports.productListController = async(req, res) => {
    const cat = req.params.cat;
    const products = await Product.find({ cateogaries: cat });
    res.render("productList", { title: "productList", prods: products });
}

exports.servicesController = (req, res) => {
    res.render("services",

        { title: "Services" });
}