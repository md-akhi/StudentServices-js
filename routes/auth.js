var express = require("express");
//var router = express.Router();
const Users = require("../model/user");
//var { check } = require("express-validator");
let ssen = false;
var app = express();

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (ssen) {
    console.log(ssen);
    res.redirect("/dashboard");
  } else {
    next();
  }
};

app.get("/", function (req, res) {
  res.redirect("/login");
});

app
  .route(["/signup", "/register"])
  .get(sessionChecker, function (req, res) {
    res.render("customer/auth/signup", { name: "signup" });
  })
  .post(function (req, res) {
    // check('fullname', "نام اجباری است")
    // check('email', "ایمیل اجباری است", 'ایمیل وجود دارد');
    // check('password', " رمز عبوراجباری است", 'پسوردها یکسان نیستند');
    // check("email", "ایمیل نامعتبر است").isEmail()
    const { fullname, email, password, passwordConfirmation } = req.body;
    if (!req.body.email || !req.body.password) {
      res.render("customer/auth/signup", { message: "Invalid credentials!" });
    } else {
      Users.findOne({ email: req.body.email })
        .then((user) => {
          if (user.email === req.body.email) {
            res.render("customer/auth/signup", {
              message: "User Already Exists! Login or choose another user id",
            });
          }
        })
        .catch((err) => {
          res.render("customer/auth/signup", {
            message: err.message || "failed db",
          });
        });

      const newUser = new Users({
        fullname: fullname,
        email: email,
        password: password,
      });
      newUser
        .save(newUser)
        .then((user) => {
          // REDIRECT TO THE dashboard
          ssen = user.id;
          res.redirect("/dashboard?id="+user.id);
        })
        .catch((err) => {
          res.render("customer/auth/signup", {
            message: err.message || "failed save db",
          });
        });
    }
  });

app
  .route("/login")
  .get(sessionChecker, function (req, res) {
    res.render("customer/auth/login", { name: "login" });
  })
  .post(function (req, res) {
    const { email, password } = req.body;
    if (!req.body.email || !req.body.password) {
      res.render("customer/auth/login", {
        message: "Please enter both email and password",
      });
    } else {
      Users.findOne({ email: req.body.email })
        .then((user) => {
          if (user.password == req.body.password) {
            // REDIRECT TO THE dashboard
            ssen = user.id;
            res.redirect("/dashboard?id="+user.id);
          }
        })
        .catch((err) => {
          res.render("customer/auth/login", {
            message: err.message || "login err",
          });
        });
    }
  });

app.get("/logout", function (req, res) {
  // req.session.destroy(function () {
  // });
    console.log("user logged out.");
    ssen = false;
  res.redirect("/");
});

module.exports = app;
