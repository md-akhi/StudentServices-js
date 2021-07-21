let router = require("express").Router();
const MUsers = require("../models/user");
module.exports = function (infoApp) {
  // middleware function
  let REmployer = require("./employer")(infoApp);
  let RFrelanser = require("./frelanser")(infoApp);
  const Mid = require("../controllers/middleware")(infoApp);
  router.use("/employer", REmployer);
  router.use("/frelanser", RFrelanser);
  router.route("/").get(Mid.logInChecker, function (req, res) {
    res.render(dir.tCustomer + "/dashboard", { name: "dashboard" });
  });
  return router;
};
