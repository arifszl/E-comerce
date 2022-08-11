const User = require("../model/user")

exports.getcartController = async(req, res) => {

    User.findById(req.user._id).populate("items.productId", "price")
        .exec((err, u) => {
            return console.log(u)
            res.render("cart", { title: "cart", user: u })

        })

    // req.user
    //     .populate('items.productId')

    // .then(user => {
    //         const products = user.items;
    //         return console.log(products)
    //         res.render('shop/cart', {
    //             path: '/cart',
    //             pageTitle: 'Your Cart',
    //             products: products
    //         });
    //     })
    //     .catch(err => console.log(err));
}
exports.getcheckoutController = (req, res) => { //change only variable(homeController)
    res.render("checkout", { title: "checkout" })
}
exports.getorderController = (req, res) => { //change only variable(homeController)
    res.render("order", { title: "order" })
}


// exports.userController=(req,res)=>{
//     res.render("signupForm",
//     {title:"sign up"}
//     );
// }

// exports.postAdduserdata = (req,res)=>{
//     console.log(req.body)

//     const p2 = new User({
//         Name:req.body.name,
//         password:req.body.password,
//         email:req.body.email
//     })
//     p2.save();
//     res.redirect("/")
// }



exports.getAccountController = (req, res) => { //change only variable(homeController)
    res.render("user/account", { title: "account", user: req.user })
}