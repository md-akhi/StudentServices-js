const Users = require("../model/user");
//var { check } = require("express-validator");


module.exports = function(app, ssen) {

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  console.log(ssen);
  if (ssen.user) {
    res.redirect("/dashboard");
  } else {
    next();
  }
};

app.get("/auth", function (req, res) {
  res.redirect("/auth/login");
});

app
  .route(["/auth/signup", "/auth/register"])
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
          ssen.user = user;
          res.redirect("/dashboard");
        })
        .catch((err) => {
          res.render("customer/auth/signup", {
            message: err.message || "failed save db",
          });
        });
    }
  });

app
  .route("/auth/login")
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
            ssen.user = user;
            res.redirect("/dashboard");
          }
        })
        .catch((err) => {
          res.render("customer/auth/login", {
            message: err.message || "login err",
          });
        });
    }
  });

app.get("/auth/logout", function (req, res) {
  console.log("user logged out.");
  ssen.user = false;
  res.redirect("/");
});

};
