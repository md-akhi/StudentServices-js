const Users = require("../model/user");
const Frelanser = require("../model/frelanser");
const Employer = require("../model/employer");


module.exports = function(app, ssen) {

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (!ssen.user) {
    res.redirect("/auth/login?massage=pleaseLogIn");
  } else {
    next();
  }
};

app.get("/dashboard", sessionChecker, function (req, res) {
  res.render("customer/dashboard/dashboard", { name: "dashboard" });
});

app.get("/dashboard/frelanser", sessionChecker, function (req, res) {
  res.render("customer/dashboard/frelanser", { name: "frelanser" });
});

app.get("/dashboard/frelanser/request/:id", sessionChecker, function (req, res) {
  res.render("customer/dashboard/frelanser", { name: "frelanser" });
});

app.get("/dashboard/frelanser/edit/:id", sessionChecker, function (req, res) {
  res.render("customer/dashboard/frelanser", { name: "frelanser" });
});

app.get("/dashboard/employer", sessionChecker, function (req, res) {
  res.render("customer/dashboard/employer", { name: "employer" });
});

app.get("/dashboard/employer/add/:id", sessionChecker, function (req, res) {
  res.render("customer/dashboard/employer", { name: "employer" });
});

app.get("/dashboard/employer/edit/:id", sessionChecker, function (req, res) {
  res.render("customer/dashboard/employer", { name: "employer" });
});

};
