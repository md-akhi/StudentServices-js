let router = require("express").Router();
const Users = require("../models/user");
const Frelanser = require("../models/frelanser");


module.exports = function (infoApp) {
  const CFrelanser = require("../controllers/frelanser")(infoApp);

  // middleware function
  const Mid = require("../controllers/middleware")(infoApp);

  router.route("/").get(Mid.logInChecker, function (req, res) {
    res.render(dir.tCustomer + dir.tDashboard + "/frelanser", {
      name: "frelanser",
    });
  });

  router.route("/request/:id").get(Mid.logInChecker, function (req, res) {
    res.render(dir.tCustomer + dir.tDashboard + "/frelanser", {
      name: "frelanser",
    });
  });

  router.route("/edit/:id").get(Mid.logInChecker, function (req, res) {
    res.render(dir.tCustomer + dir.tDashboard + "/frelanser", {
      name: "frelanser",
    });
  });
  return router;
};
