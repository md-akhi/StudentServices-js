const Users = require("../models/user");
var bcrypt = require("bcryptjs");

module.exports = function(ssen) {

  let dirAuth = "/auth";
  let dirCustomer = "customer";

// middleware function
const Mid = require("../controllers/middleware")(ssen);

  return {

    createUser: function (newUser, callback) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
          newUser.password = hash;
          newUser.save(callback);
        });
      });
    },

    getUserByEmail: function (email, callback) {
      var query = { email: email };
      Users.findOne(query, callback);
    },

    getUserById: function (id, callback) {
      Users.findById(id, callback);
    },

    comparePassword: function (givenPassword, hash, callback) {
      bcrypt.compare(givenPassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
      });
    },

    getAllUsers: function (callback) {
      Users.find(callback);
    },

    get_auth: function (req, res) {
      res.redirect(dirAuth + "/login");
    },

    get_signup: [
      Mid.logInChecker,
      function (req, res) {
        res.render(dirCustomer + dirAuth + "/signup", { name: "signup" });
      }
    ],

    post_signup: function (req, res) {
      // check('fullname', "نام اجباری است")
      // check('email', "ایمیل اجباری است", 'ایمیل وجود دارد');
      // check('password', " رمز عبوراجباری است", 'پسوردها یکسان نیستند');
      // check("email", "ایمیل نامعتبر است").isEmail()
      const { fullname, email, password, passwordConfirmation } = req.body;
      if (!req.body.email || !req.body.password) {
        res.render(dirCustomer + dirAuth + "/signup", { message: "Invalid credentials!" });
      } else {
        Users.findOne({ email: req.body.email })
          .then((user) => {
            if (user.email === req.body.email) {
              res.render(dirCustomer + dirAuth + "/signup", {
                message: "User Already Exists! Login or choose another user id",
              });
            }
          })
          .catch((err) => {
            res.render(dirCustomer + dirAuth + "/signup", {
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
            res.render(dirCustomer + dirAuth + "/signup", {
              message: err.message || "failed save db",
            });
          });
      }
    },

    get_login: [
      Mid.logInChecker,
      function (req, res) {
        res.render(dirCustomer + dirAuth + "/login", { name: "login" });
      }
    ],

    post_login: function (req, res) {
      const { email, password } = req.body;
      if (!req.body.email || !req.body.password) {
        res.render(dirCustomer + dirAuth + "/login", {
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
            res.render(dirCustomer + dirAuth + "/login", {
              message: err.message || "login err",
            });
          });
      }
    },

    get_logout: function (req, res) {
      console.log("user logged out.");
      ssen.user = false;
      res.redirect("/");
    },

  };

};
