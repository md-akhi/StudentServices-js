let router = require("express").Router();
module.exports = function (infoApp) {
  const CAuth = require("../controllers/auth")(infoApp);
  //var { check } = require("express-validator");

  // root
  router.get("/", CAuth.get_auth);

  router
    .route(["/register", "/signup"])
    .get(CAuth.get_register)
    .post(CAuth.post_register);

  router
    .route(["/login", "/signin"])
    .get(CAuth.get_login)
    .post(CAuth.post_login);

  router.get("/logout", CAuth.get_logout);
  return router;
};
