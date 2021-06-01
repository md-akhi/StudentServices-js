const Users = require("../models/user");
const Frelanser = require("../models/frelanser");
const Employer = require("../models/employer");

let dirDashboard = "/dashboard";
let dirCustomer = "customer";

module.exports = function(app, ssen) {

  const Frelanser = require("../controllers/frelanser")(ssen);

// middleware function
const Mid = require("../controllers/middleware")(ssen);

app.get(dirDashboard + "/frelanser", Mid.logInChecker, function (req, res) {
  res.render(dirCustomer + dirDashboard + "/frelanser", { name: "frelanser" });
});

app.get(dirDashboard + "/frelanser/request/:id", Mid.logInChecker, function (req, res) {
  res.render(dirCustomer + dirDashboard + "/frelanser", { name: "frelanser" });
});

app.get(dirDashboard + "/frelanser/edit/:id", Mid.logInChecker, function (req, res) {
  res.render(dirCustomer + dirDashboard + "/frelanser", { name: "frelanser" });
});

};
