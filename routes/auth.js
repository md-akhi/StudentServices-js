let router = require("express").Router();
//var { check } = require("express-validator");

module.exports = function (infoApp) {
	// middleware function
	let Mid = require("../controllers/middleware")(infoApp);
	router.use(Mid.sessionChecker);
	// controller
	const CAuth = require("../controllers/auth")(infoApp);

	// root
	router.get("/", CAuth.getRoot);

	router
		.route(["/register", "/signup"])
		.get(CAuth.getRegister)
		.post(CAuth.postRegister);

	router.route(["/login", "/signin"]).get(CAuth.getLogIn).post(CAuth.postLogIn);

	router.get("/logout", CAuth.getLogOut);
	return router;
};
