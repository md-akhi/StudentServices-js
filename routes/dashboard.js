let router = require("express").Router();
const MUsers = require("../models/user");

module.exports = function (infoApp) {
  // middleware function
  const Mid = require("./middleware")(infoApp);
  router.use(Mid.sessionChecker);

  // controller
  const CDashboard = require("../controllers/dashboard")(infoApp);
  // root
  router.route("/").get(CDashboard.getRoot);
  return router;
};
