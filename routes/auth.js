import express from "express";
//var { check } = require("express-validator");
import Mid from "../controllers/middleware.js";
import CAuth from "../controllers/auth.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Mid(infoApp).sessionChecker);

	// root
	router.get("/", CAuth(infoApp).getRoot);

	router
		.route(["/register", "/signup"])
		.get(CAuth(infoApp).getRegister)
		.post(CAuth(infoApp).postRegister);

	router
		.route(["/login", "/signin"])
		.get(CAuth(infoApp).getLogIn)
		.post(CAuth(infoApp).postLogIn);

	router.get("/logout", CAuth(infoApp).getLogOut);
	return router;
}
