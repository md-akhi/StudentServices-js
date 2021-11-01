import express from "express";
import Middleware from "../controllers/middleware.js";
import ControllerHome from "../controllers/home.js";

export default function (infoApp) {
	let router = express.Router();
	// middleware function
	router.use(Middleware(infoApp).SessionChecker);

	// root
	router.route("/").get(ControllerHome(infoApp).Root_Get);

	router.route("/projects").get(ControllerHome(infoApp).Projects_Get);
	router.route("/project/:id").get(ControllerHome(infoApp).Project_Get);

	router.route("/users").get(ControllerHome(infoApp).Users_Get);
	router.route("/user/:id").get(ControllerHome(infoApp).User_Get);

	return router;
}
