const User = require("../model/user")


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