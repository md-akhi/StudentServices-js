let router = require("express").Router();
const { path } = require("../config/routes");

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

	// catch undefined routes and respond with 404
	router.use(function (req, res, next) {
		//res.status(404).send("Sorry can't find that! 400");
		res.status(404).render("error/404", { url: req.url });
	});

	// catch server errors and respond with 500
	router.use(function (err, req, res, next) {
		console.error(err.stack);
		//res.status(500).send("Something broke! 5xx");
		res.status(500).render("error/500", { url: req.url });
	});

	return router;
};
