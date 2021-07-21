let router = require("express").Router();

module.exports = function (infoApp) {
  //router
  let RHome = require("./home")(infoApp);
  let RAuth = require("./auth")(infoApp);
  let RDashboard = require("./dashboard")(infoApp);
  router.use("/", RHome);
  router.use("/auth", RAuth);
  router.use("/dashboard", RDashboard);
  return router;
};
