let router = require("express").Router();
const { path } = require("../config/varStatic");

module.exports = function (infoApp) {
	// middleware function
	let Mid = require("../controllers/middleware")(infoApp);
	router.use(Mid.sessionChecker);

	//router
	let RHome = require("./home")(infoApp);
	// customer
	let RCAuth = require("./auth")(infoApp);
	let RCDashboard = require("./dashboard")(infoApp);
	let RCEmployer = require("./employer")(infoApp);
	let RCFrelanser = require("./frelanser")(infoApp);
	// customer
	router.use("/", RHome);
	router.use(path.CAuth(), RCAuth);
	router.use(path.CDashboard(), RCDashboard);
	router.use(path.CEmployer(), RCEmployer);
	router.use(path.CFrelanser(), RCFrelanser);
	return router;
};
