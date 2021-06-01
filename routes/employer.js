const Users = require("../models/user");
const Frelanser = require("../models/frelanser");
const MEmployer = require("../models/employer");

let dirDashboard = "/dashboard";
let dirCustomer = "customer";

module.exports = function(app, ssen) {

  const CEmployer = require("../controllers/employer")(ssen);

// middleware function
const Mid = require("../controllers/middleware")(ssen);

app.get(dirDashboard + "/employer", CEmployer.get_employer);

app.get(dirDashboard + "/employer/add/:id", Mid.logInChecker, function (req, res) {
  res.render(dirCustomer + dirDashboard + "/employer", { name: "employer" });``
});

app.get(dirDashboard + "/employer/edit/:id", Mid.logInChecker, function (req, res) {
  res.render(dirCustomer + dirDashboard + "/employer", { name: "employer" });
});

app.get(dirDashboard + "/employer/pay/:id", Mid.logInChecker, function (req, res) {
  res.render(dirCustomer + dirDashboard + "/employer", { name: "employer" });
});

};
