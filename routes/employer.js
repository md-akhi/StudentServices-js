let router = require("express").Router();
const MUsers = require("../models/user");
const MEmployer = require("../models/employer");

let dir.tDashboard = "/dashboard";
let dir.tCustomer = "customer";
module.exports = function (infoApp) {
  const CEmployer = require("../controllers/employer")(infoApp);

  // middleware function
  const Mid = require("../controllers/middleware")(infoApp);

  router.route("/").get(CEmployer.get_employer);

  router.route("/add/:id").get(Mid.logInChecker, function (req, res) {
    res.render(dir.tCustomer + dir.tDashboard + "/employer", {
      name: "employer",
    });
    ``;
  });

  router.route("/edit/:id").get(Mid.logInChecker, function (req, res) {
    res.render(dir.tCustomer + dir.tDashboard + "/employer", {
      name: "employer",
    });
  });

  router.route("/pay/:id").get(Mid.logInChecker, function (req, res) {
    res.render(dir.tCustomer + dir.tDashboard + "/employer", {
      name: "employer",
    });
  });
  return router;
};
