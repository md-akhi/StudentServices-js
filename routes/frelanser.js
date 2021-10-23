import express from "express";
import Middleware from "../controllers/middleware.js";
import ControllerFrelanser from "../controllers/frelanser.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Middleware(infoApp).sessionChecker);

	router.route("/").get(ControllerFrelanser(infoApp).rootGet);

	router.route("/requests").get(ControllerFrelanser(infoApp).requestsGet);

	router
		.route("/project/:id/request/add")
		.get(ControllerFrelanser(infoApp).addRequestGet)
		.post(ControllerFrelanser(infoApp).addRequestPost);

	router
		.route("/request/:id/edit")
		.get(ControllerFrelanser(infoApp).editRequestGet)
		.post(ControllerFrelanser(infoApp).editRequestPost);

	router
		.route("/request/:id/del")
		.get(ControllerFrelanser(infoApp).delRequestGet);

	// router
	// 	.route("/todo/add/:id")
	// 	.get(ControllerFrelanser(infoApp).detailProjectGet)
	// 	.post(ControllerFrelanser(infoApp).detailProjectPost);

	// router
	// 	.route("/todo/edit/:id")
	// 	.get(ControllerFrelanser(infoApp).detailProjectGet)
	// 	.post(ControllerFrelanser(infoApp).detailProjectPost);

	// router
	// 	.route("/todo/del/:id")
	// 	.get(ControllerFrelanser(infoApp).getDetailProject)
	// 	.post(ControllerFrelanser(infoApp).postDetailProject);

	// router
	// 	.route("/project/:id/file")
	// 	.get(ControllerFrelanser(infoApp).getEditProject)
	// 	.post(ControllerFrelanser(infoApp).postEditProject);

	// router
	// 	.route("/project/:id/bug")
	// 	.get(ControllerFrelanser(infoApp).getEditProject)
	// 	.post(ControllerFrelanser(infoApp).postEditProject);

	// router
	// 	.route("/project/archived")
	// 	.get(ControllerFrelanser(infoApp).getEditProject)
	// 	.post(ControllerFrelanser(infoApp).postEditProject);

	// router
	// 	.route("/project/payment")
	// 	.get(ControllerFrelanser(infoApp).getEditProject)
	// 	.post(ControllerFrelanser(infoApp).postEditProject);

	// router
	// 	.route("/profile")
	// 	.get(ControllerFrelanser(infoApp).getEditProject)
	// 	.post(ControllerFrelanser(infoApp).postEditProject);

	// router
	// 	.route("/profile/:id")
	// 	.get(ControllerFrelanser(infoApp).getEditProject)
	// 	.post(ControllerFrelanser(infoApp).postEditProject);

	// router
	// 	.route("/tickets")
	// 	.get(ControllerFrelanser(infoApp).orderTodoGet)
	// 	.post(ControllerFrelanser(infoApp).orderTodoPost);

	// router
	// 	.route("/ticket/:id")
	// 	.get(ControllerFrelanser(infoApp).orderTodoGet)
	// 	.post(ControllerFrelanser(infoApp).orderTodoPost);

	return router;
}
