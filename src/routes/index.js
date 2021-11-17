import Express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { customerPath, homePath } from "../config/routes.js";
import Middleware from "../controllers/middleware.js";
import HomeRouter from "./home.js";
import AuthRouter from "./auth.js";
import DashboardRouter from "./dashboard.js";
import Error404React from "../views/error/404";
import Error500React from "../views/error/500";

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
		const RenderReact = renderToString(<Error404React />);
		res.status(404);
		res.render("error/404", {
			reactApp: RenderReact,
		});
	});

	// catch server errors and respond with 500
	Router.use(function (err, req, res, next) {
		//res.status(500).send("Something broke! 5xx");
		const RenderReact = renderToString(<Error500React />);
		res.status(500);
		res.render("error/500", {
			reactApp: RenderReact,
		});
	});

	return Router;
}
