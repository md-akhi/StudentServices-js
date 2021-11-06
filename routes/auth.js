import Express from "express";
//var { check } = require("express-validator");
import Middleware from "../controllers/middleware.js";
import AuthController from "../controllers/auth.js";

export default function (infoApp) {
	let Router = Express.Router();

	// middleware function
	Router.use(Middleware(infoApp).SessionChecker);

	// root
	Router.get("/", AuthController(infoApp).Root_Get);

	Router.route(["/register", "/signup"])
		.get(AuthController(infoApp).Register_Get)
		.post(AuthController(infoApp).Register_Post);

	Router.route(["/login", "/signin"])
		.get(AuthController(infoApp).LogIn_Get)
		.post(AuthController(infoApp).LogIn_Post);

	Router.get("/logout", AuthController(infoApp).LogOut_Get);
	return Router;
}
