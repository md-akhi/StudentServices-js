let router = require("express").Router();
module.exports = function ( infoApp) {
  const CHome = require("../controllers/home")(infoApp);
  router.route("/").get(CHome.get_home);
  return router;
};
