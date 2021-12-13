import Express from "express";
import AdminRouter from "./admin.js";
import EmployerRouter from "./employer.js";
import FrelanserRouter from "./frelanser.js";
import GuestRouter from "./guest.js";

export default function () {
	const Router = Express.Router();

	Router.use(Express.json());
	Router.use(Express.urlencoded({ extended: false }));

	//Router
	Router.use("/admin", AdminRouter());
	Router.use("/employer", EmployerRouter());
	Router.use("/frelanser", FrelanserRouter());
	Router.use("/guest", GuestRouter());

	// catch undefined routes and respond with 404
	Router.use(function (req, res, next) {
		res
			.status(404)
			.json({ status: "404", massage: "Sorry can't find that! 404" });
	});

	// catch server errors and respond with 500
	Router.use(function (err, req, res, next) {
		//console.error(err.stack);
		res
			.status(500)
			.json({ status: "500", massage: "Something broke! 500", error: err });
	});

	return Router;
}
