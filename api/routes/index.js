import express from "express";
import RouterAdmin from "./admin.js";
import RouterEmployer from "./employer.js";
import RouterFrelanser from "./frelanser.js";
import RouterGuest from "./guest.js";

export default function () {
	let router = express.Router();

	router.use(express.json());
	router.use(express.urlencoded({ extended: true }));

	//router
	router.use("/admin", RouterAdmin());
	router.use("/employer", RouterEmployer());
	router.use("/frelanser", RouterFrelanser());
	router.use("/guest", RouterGuest());

	// catch undefined routes and respond with 404
	router.use(function (req, res, next) {
		res
			.status(404)
			.json({ status: "404", massage: "Sorry can't find that! 404" });
	});

	// catch server errors and respond with 500
	router.use(function (err, req, res, next) {
		//console.error(err.stack);
		res.status(500).json({ status: "500", massage: "Something broke! 500" });
	});

	return router;
}
