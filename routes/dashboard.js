import express from "express";
//import MUsers from "../models/user.js";
import Mid from "../controllers/middleware.js";
import CDashboard from "../controllers/dashboard.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Mid(infoApp).sessionChecker);

	// root
	router.route("/").get(CDashboard(infoApp).getRoot);
	return router;
}
