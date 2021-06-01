const Users = require("../models/user");
const Frelanser = require("../models/frelanser");
const Employer = require("../models/employer");

let dirDashboard = "/dashboard";
let dirCustomer = "customer";

module.exports = function(app, ssen) {

// middleware function
const Mid = require("../controllers/middleware")(ssen);

app.get(dirDashboard, Mid.logInChecker, function (req, res) {
  res.render(dirCustomer + dirDashboard + "/dashboard", { name: "dashboard" });
});

};
