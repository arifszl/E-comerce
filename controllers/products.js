const Product = require("../model/product");
const User = require("../model/user");

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


exports.postCart = async(req, res) => {


    Product.findById(req.body.productId)
        .then(product => {
            return req.user.addCart(product)
        }).then(result => {
            res.redirect("/cart")
        })
}
exports.getcartController = async(req, res) => {

    User.findOne({ _id: req.user._id }).populate("cart.items.productId")
        .exec((err, u) => {
            if (err) return console.log(err);
            // return console.log(u.cart.items)
            res.render("cart", { title: "cart", user: u })


        })



}

exports.postremoveQty = async(req, res) => {


    Product.findById(req.body.productId)
        .then(product => {
            return req.user.removeQty(product)
        }).then(result => {
            res.redirect("/cart")
        })
}