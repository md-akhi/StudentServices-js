import express from "express";
import Mid from "../controllers/middleware.js";
import CHome from "../controllers/home.js";

export default function (infoApp) {
	let router = express.Router();
	// middleware function
	router.use(Mid(infoApp).sessionChecker);

	// root
	router.route("/").get(CHome(infoApp).getRoot);
	return router;
}
