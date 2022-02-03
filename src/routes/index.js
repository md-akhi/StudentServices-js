import Express from "express";
import { customerPath, homePath } from "./routes.js";
import Middleware from "../controllers/middleware.js";
import Error from "../controllers/error.js";
import HomeRouter from "./home.js";
import AuthRouter from "./auth.js";
import DashboardRouter from "./dashboard.js";

export default function (infoApp) {
	const Router = Express.Router();

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
	Router.use(Error(infoApp).E404);

	// catch server errors and respond with 500
	Router.use(Error(infoApp).E500);

	return Router;
}
