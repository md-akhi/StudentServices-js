import Express from "express";
import { customerPath, homePath } from "../config/routes.cjs";
import Middleware from "../controllers/middleware.js";
import HomeRouter from "./home.js";
import AuthRouter from "./auth.js";
import DashboardRouter from "./dashboard.js";

export default function (infoApp) {
	let Router = Express.Router();

	// middleware function
	Router.use(Middleware(infoApp).SessionChecker);

	//Router
	Router.use("/", HomeRouter(infoApp));

	// customer
	Router.use(homePath.Auth(), AuthRouter(infoApp));
	Router.use(
		customerPath.Dashboard(),
		Middleware(infoApp).LogInChecker,
		DashboardRouter(infoApp)
	);

	// catch undefined routes and respond with 404
	Router.use(function (req, res, next) {
		//res.status(404).send("Sorry can't find that! 400");
		res.status(404).render("error/404");
	});

	// catch server errors and respond with 500
	Router.use(function (err, req, res, next) {
		//res.status(500).send("Something broke! 5xx");
		res.status(500).render("error/500");
	});

	return Router;
}
