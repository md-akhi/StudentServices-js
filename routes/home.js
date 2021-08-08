let router = require("express").Router();

module.exports = function (infoApp) {
  // middleware function
  let Mid = require("./middleware")(infoApp);
  router.use(Mid.sessionChecker);

  // controller
  const CHome = require("../controllers/home")(infoApp);
  // root
  router.route("/").get(CHome.getRoot);
  return router;
};
