import Express from "express";
import Middleware from "../controllers/middleware.js";
import { customerPath as Path } from "./routes.js";
import DashboardController from "../controllers/dashboard.js";
import EmployerRouter from "./employer.js";
import FrelanserRouter from "./frelanser.js";

export default function (infoApp) {
	let Router = Express.Router();

	// middleware function
	Router.use(Middleware(infoApp).SessionChecker);

	// root
	Router.route("/").get(DashboardController(infoApp).Root_Get);

	Router.use(Path.employer, EmployerRouter(infoApp));
	Router.use(Path.frelanser, FrelanserRouter(infoApp));

	return Router;
}
