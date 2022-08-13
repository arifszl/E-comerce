const Order = require("../model/order");
const Product = require("../model/product");
const User = require("../model/user");
const mongoose = require("mongoose");

exports.homeController = async(req, res) => { //change only variable(homeController)
    const products = await Product.find();
    // return console.log(products)
    res.render("index", { title: "Home", products: products });
}

exports.contactController = (req, res) => {
    res.render("contact", { title: "Contact" });
}

exports.productDetailController = async(req, res) => {

    const prodId = req.query.pid;
    //   return console.log(prodId)
    Product.findById(prodId)
        .then(product => {
            res.render("productDetail", {
                product: product,
                title: product.productName,
                path: '/products',
                user: req.user
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
exports.getconfirmedorderController = async(req, res) => { //change only variable(homeController)

    User.findOne({ _id: req.user._id }).populate("cart.items.productId")
        .exec((err, u) => {
            if (err) return console.log(err);
            // return console.log(u.cart.items)
            res.render("confirmorder", { title: "Confirm Order", user: u })


        })
}

exports.getorderController = async(req, res) => { //change only variable(homeController)

    Order.find({ user: req.user._id }).populate("products.productId")
        .exec((err, o) => {
            if (err) return console.log(err);
            // return console.log(u.cart.items)
            res.render("order", { title: "Order", user: req.user, orders: o })


        })
}
exports.gettrackOrderController = async(req, res) => { //change only variable(homeController)
    const oId = req.query.oid

    Order.findById(oId).populate("products.productId")
        .exec((err, o) => {
            if (err) return console.log(err);
            // return console.log(o)
            res.render("trackOrder", { title: "Order Tracking", user: req.user, order: o })


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
exports.postremoveFromCart = async(req, res) => {


    const prodId = req.body.productId;
    const type = req.body.selecttype;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            if (type === "cart") {
                res.redirect('/cart');
            } else {
                res.redirect('/confirmedorder');
            }

        })
        .catch(err => console.log(err));
}
exports.postcancelorder = async(req, res) => {


    const oId = req.body.oId;
    Order.findByIdAndRemove(oId)
        .then(result => {

            res.redirect('/order');


        })
        .catch(err => console.log(err));
}


exports.postConfirmOrder = async(req, res) => {


    const addressId = req.body.addressId;
    const totalPrice = req.body.totalPrice;

    const address = req.user.shippingDetail.filter(s => s._id.toString() === addressId)
        //  return console.log(address)

    const o = new Order({
        products: req.user.cart.items,
        user: req.user,
        totalPrice: totalPrice,
        shippingDetail: address[0]
    })
    o.save(result => {
        req.user
            .clearCart()
            .then(result => {

                res.redirect('/order');


            })
            .catch(err => console.log(err));
    })

}