import express from "express";
import Mid from "../controllers/middleware.js";
import CFrelanser from "../controllers/frelanser.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Mid(infoApp).sessionChecker);

	router.route("/").get(CFrelanser(infoApp).getRoot);

	router
		.route("/request/add/:id")
		.get(CFrelanser(infoApp).getAddRequest)
		.post(CFrelanser(infoApp).postAddRequest);

	router
		.route("/request/edit/:id")
		.get(CFrelanser(infoApp).getEditRequest)
		.post(CFrelanser(infoApp).postEditRequest);
	router
		.route("/request/del/:id")
		.get(CFrelanser(infoApp).getDelRequest)
		.post(CFrelanser(infoApp).postDelRequest);
	return router;
}
