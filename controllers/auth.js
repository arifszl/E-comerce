const User = require("../model/user")
const bcrypt = require("bcrypt")
const mail = require("../utils/mail")
exports.getLoginController = (req, res) => { //change only variable(homeController)
    res.render("loginForm", {
        title: "Login",
        msg1: null,
        password: null,
        email: null
    })
}



exports.getSignupController = (req, res) => { //change only variable(homeController)
    res.render("signupForm", { title: "Sign-Up", msg: null, name: null, password: null, email: null })
}
exports.postSignup = async(req, res) => {

    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    if (await User.findOne({ email: req.body.email })) {
        return res.render("signupForm", { title: "Sign-Up", msg: "The email is already registered", name: req.body.name, password: req.body.password, email: req.body.email })

    }
    const u = new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword

    })
    u.save();
    res.redirect("/")
}

exports.postLogin = async(req, res) => {

    const u = await User.findOne({ email: req.body.email })

    if (!u) {
        return res.render("loginForm", { title: "Login", msg1: "Didn't find account, Plz Sign-Up", password: req.body.password, email: req.body.email })

    }
    const condition = await bcrypt.compare(req.body.password, u.password); //Decrypting password
    if (!condition) {
        return res.render("loginForm", { title: "Login", msg1: "Wrong password!", password: req.body.password, email: req.body.email })

    }
    req.session.isLoggedIn = true;
    req.session.user = u;
    return req.session.save(err => {
        res.redirect("/")

    })
}


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.postMail = async(req, res) => {

    mail.sendMail({
        to: "maumadhuban31@gmail.com",
        subject: "Hello there",
        html: "<h1>Sign up with our website </h1>"
    })
    res.redirect("/")
}

exports.getMailController = (req, res) => { //change only variable(homeController)
    res.render("mail", { title: "Mail", msg: null, name: null, password: null, email: null })
}