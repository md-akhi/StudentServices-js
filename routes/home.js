import express from "express";
import Middleware from "../controllers/middleware.js";
import controllerHome from "../controllers/home.js";

export default function (infoApp) {
	let router = express.Router();
	// middleware function
	router.use(Middleware(infoApp).sessionChecker);

	// root
	router.route("/").get(controllerHome(infoApp).rootGet);

	router.route("/projects").get(controllerHome(infoApp).projectsGet);
	router.route("/project/:id").get(controllerHome(infoApp).projectGet);

	router.route("/users").get(controllerHome(infoApp).usersGet);
	router.route("/user/:id").get(controllerHome(infoApp).userGet);

	return router;
}
