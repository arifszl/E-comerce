 require("./db/db")
 const express = require("express");
 const bodyParser = require("body-parser");
 const productRoutes = require("./routes/products")
 const adminRoutes = require("./routes/admin")
 const userRoutes = require("./routes/user")
 const authRoutes = require("./routes/auth")
 const session = require("express-session");
 const User = require("./model/user");
 const user = require("./model/user");

 const MONGODB_URI = "mongodb://localhost:27017/ecommerce";
 const MongoDBstore = require("connect-mongodb-session")(session);
 // fixed part for every project from here
 const app = express();
 //session for orgainzeer // for remembering user and browser to not login again
 const oSessionStore = new MongoDBstore({ //calling constructor
     uri: MONGODB_URI,
     collection: 'osession'
 });

 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 app.use(express.static("public"));

 app.set("view engine", "ejs")
 app.use("/image", express.static("upload/images"));

 //organizer session // for osession
 app.use(session({
     secret: "My secret is awsome",
     resave: false,
     saveUninitialized: false,
     store: oSessionStore
 }))

 //t0 here

 app.use(productRoutes)
 app.use(adminRoutes)
 app.use(userRoutes)
 app.use(authRoutes)
     //this should also fixed

 //organizer session logged
 app.use((req, res, next) => {
     if (!req.session.user) {
         return next();
     }
     User.findById(req.session.user._id)
         .then(user => {
             req.user = user;
             next();
         })
         .catch(err => console.log(err));
 });
 //local variable
 app.use((req, res, next) => {
     res.locals.isAuthenticated = req.session.isLoggedIn;

     next();
 });

 app.listen(8000, () => {
     console.log("listening at 8000");
 })