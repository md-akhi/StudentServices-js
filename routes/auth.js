import express from "express";
//var { check } = require("express-validator");
import Middleware from "../controllers/middleware.js";
import ControllerAuth from "../controllers/auth.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Middleware(infoApp).SessionChecker);

	// root
	router.get("/", ControllerAuth(infoApp).Root_Get);

	router
		.route(["/register", "/signup"])
		.get(ControllerAuth(infoApp).Register_Get)
		.post(ControllerAuth(infoApp).Register_Post);

	router
		.route(["/login", "/signin"])
		.get(ControllerAuth(infoApp).LogIn_Get)
		.post(ControllerAuth(infoApp).LogIn_Post);

	router.get("/logout", ControllerAuth(infoApp).LogOut_Get);
	return router;
}
