import express from "express";
//import User as ModelUser from "../models/user.js";
import Middleware from "../controllers/middleware.js";
import ControllerDashboard from "../controllers/dashboard.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Middleware(infoApp).SessionChecker);

	// root
	router.route("/").get(ControllerDashboard(infoApp).Root_Get);
	return router;
}
