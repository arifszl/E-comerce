const User = require("../model/user")


exports.getaddressController = (req, res) => { //change only variable(homeController)
    res.render("user/address", { title: "address" })
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
exports.postAddAddress = async(req, res) => {
    const name = req.body.fname + " " + req.body.lname
    const adr = req.body.adr
    const phone = req.body.phone

    req.user.addAddress(adr, name, phone)
    res.redirect("/account")

}