var express = require("express");
const Users = require("../model/user");

let ssen = false;
var app = express();

// middleware function to check for logged-in users
var sessionChecker = (req, res, next) => {
  if (!ssen) {
    if(req.query.id)
      ssen = req.query.id;
    else
      res.redirect("/auth/login?massage=pleaseLogIn");
  } else {
    next();
  }
};

app.get("/", sessionChecker, function (req, res) {
  console.log(ssen);
  // if(ssen){
  //   res.redirect("/dashboard?massage=ok");
  // }
  res.render("customer/dashboard/dashboard", { name: "dashboard" });
});

app.get("/frelanser", sessionChecker, function (req, res) {
  res.render("customer/dashboard/frelanser", { name: "frelanser" });
});

app.get("/employer", sessionChecker, function (req, res) {
  res.render("customer/dashboard/employer", { name: "employer" });
});

app.get("/logout", function (req, res) {
    console.log("user logged out.");
    ssen = false;
  res.redirect("/auth/logout");
});

module.exports = app;
