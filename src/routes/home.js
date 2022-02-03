import Express from "express";
import Middleware from "../controllers/middleware.js";
import HomeController from "../controllers/home.js";

export default function (infoApp) {
	const Router = Express.Router();

	// root
	Router.route("/").get(HomeController(infoApp).Root_Get);

	Router.route("/projects").get(HomeController(infoApp).Projects_Get);
	Router.route("/project/:id").get(HomeController(infoApp).Project_Get);

	Router.route("/users").get(HomeController(infoApp).Users_Get);
	Router.route("/user/:id").get(HomeController(infoApp).User_Get);

	return Router;
}
