import express from "express";
import { pathCustomer } from "../config/routes.cjs";
import Mid from "../controllers/middleware.js";
import RHome from "./home.js";
import RCAuth from "./auth.js";
import RCDashboard from "./dashboard.js";
import RCEmployer from "./employer.js";
import RCFrelanser from "./frelanser.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Mid(infoApp).sessionChecker);

	//router
	router.use("/", RHome(infoApp));
	// customer
	router.use(pathCustomer.Auth(), RCAuth(infoApp));
	router.use(pathCustomer.Dashboard(), RCDashboard(infoApp));
	router.use(pathCustomer.Employer(), RCEmployer(infoApp));
	router.use(pathCustomer.Frelanser(), RCFrelanser(infoApp));

	// catch undefined routes and respond with 404
	router.use(function (req, res, next) {
		//res.status(404).send("Sorry can't find that! 400");
		res.status(404);
		res.render("error/404", { url: req.url });
	});

	// catch server errors and respond with 500
	router.use(function (err, req, res, next) {
		console.error(err.stack);
		//res.status(500).send("Something broke! 5xx");
		res.status(500);
		res.render("error/500", { url: req.url });
	});

	return router;
}
