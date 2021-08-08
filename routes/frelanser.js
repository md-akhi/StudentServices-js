let router = require("express").Router();

module.exports = function (infoApp) {
  // middleware function
  let Mid = require("./middleware")(infoApp);
  router.use(Mid.sessionChecker);

  // controller
  const CFrelanser = require("../controllers/frelanser")(infoApp);

  router.route("/").get(CFrelanser.getRoot);

  router
    .route("/request/add/:id")
    .get(CFrelanser.getAddRequest)
    .post(CFrelanser.postAddRequest);

  router
    .route("/request/edit/:id")
    .get(CFrelanser.getEditRequest)
    .post(CFrelanser.postEditRequest);
  router
    .route("/request/del/:id")
    .get(CFrelanser.getDelRequest)
    .post(CFrelanser.postDelRequest);
  return router;
};
