import express from "express";
import { pathCustomer as Path, pathHome } from "../config/routes.cjs";
import Middleware from "../controllers/middleware.js";
import RouterHome from "./home.js";
import RouterAuth from "./auth.js";
import RouterDashboard from "./dashboard.js";
import RouterEmployer from "./employer.js";
import RouterFrelanser from "./frelanser.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Middleware(infoApp).SessionChecker);

	//router
	router.use("/", RouterHome(infoApp));

	// customer
	router.use(pathHome.Auth(), RouterAuth(infoApp));
	router.use(Path.Dashboard(), RouterDashboard(infoApp));
	router.use(Path.Employer(), RouterEmployer(infoApp));
	router.use(Path.Frelanser(), RouterFrelanser(infoApp));

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
