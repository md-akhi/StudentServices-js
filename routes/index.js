var express = require("express");
var router = express.Router();
const User = require("../db/user");
var { check }  = require('express-validator');//req.checkbody()

//GET /
router.get("/", function (req, res) {
  res.render("home", { name: "student Services", title: "Student Services" });
});

router.get("/signup", function (req, res) {
  res.render("signup", { name: "signup" });
});

router.post("/signup",[
  check('fullname', "fullname is required").isLength({ min: 1 }),
  check('email', "Email is required").custom(value => {
    return User.getUserByEmail(value).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  }),
  check('password', "Password is required").custom((value, { req }) => {
    if (value !== req.body.passwordConfirmation) {
      throw new Error('Password confirmation is incorrect');
    }
  }),
  check("email", "Email is not valid").isEmail(),
], function (req, res) {
  const { fullname, email, password, passwordConfirmation } = req.body;
  var newUser = new User({
    fullname: fullname,
    password: password,
    email: email,
  });
  User.getUserByEmail(email, function (error, user) {
    if (error) throw new Error(error);
    if (user) {
      throw new Error("user is existed");
    }
    User.createUser(newUser, function (err, user) {
      if (err) throw new Error(err);
      res.json({ message: "user created" });
    });
  });
});

module.exports = router;
