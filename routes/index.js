var express = require("express");
var router = express.Router();
const Users = require("../model/user");
var { check } = require("express-validator");

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  console.log(req.session);
  if (req.session.user) {
      next();
  } else {
    res.render("login", { message: "please log in" });
  }
};

router.route(["/signup", "/register"])
  .get( function (req, res) {
    res.render("signup", { name: "signup" });
  })
  .post(function (req, res) {
    // check('fullname', "نام اجباری است")
    // check('email', "ایمیل اجباری است", 'ایمیل وجود دارد');
    // check('password', " رمز عبوراجباری است", 'پسوردها یکسان نیستند');
    // check("email", "ایمیل نامعتبر است").isEmail()
    const { fullname, email, password, passwordConfirmation } = req.body;
    if (!req.body.email || !req.body.password) {
      res.render("signup", { message: "Invalid credentials!" });
    } else {
      Users.findOne({ email: req.body.email })
        .then(user => {
          if (user.email === req.body.email) {
            res.render("signup", {
              message: "User Already Exists! Login or choose another user id",
            });
          }
        })
        .catch(err => {
          res.render("signup", { message: err.message || "failed db" });
        });

      const newUser = new Users({
        fullname: fullname,
        email: email,
        password: password,
      });
      newUser.save(newUser)
        .then(user => {
          // REDIRECT TO THE ROOT
          req.session.user = user;
          req.session.save();
          res.redirect("/dashborad");
        }).catch(err => {
          res.render("signup", { message: err.message || "failed save db" });
        });
    }
  });

router.get("/login", function (req, res) {
  res.render("login", { name: "login" });
});
router.post("/login", function (req, res) {
  const { email, password } = req.body;
  if (!req.body.email || !req.body.password) {
    res.render("login", { message: "Please enter both email and password" });
  } else {
    Users.findOne({ email: req.body.email })
      .then(user => {
        if (user.password == req.body.password) {
          req.session.user = user;
          req.session.save();
          res.redirect("/dashborad");
        }
      })
      .catch(err => {
        res.render("login", { message: err.message || "login err" });
      });
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy(function () {
    console.log("user logged out.");
  });
  res.redirect("/");
});

router.get("/dashborad", function (req, res) {

  console.log(req.session);
  res.render("dashborad", { name: "dashborad" });
});

module.exports = router;
