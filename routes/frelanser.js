import express from "express";
import Middleware from "../controllers/middleware.js";
import ControllerFrelanser from "../controllers/frelanser.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Middleware(infoApp).SessionChecker);

	router.route("/").get(ControllerFrelanser(infoApp).Root_Get);

	router.route("/requests").get(ControllerFrelanser(infoApp).Requests_Get);

	router
		.route("/project/:projectId/request/add")
		.get(ControllerFrelanser(infoApp).RequestAdd_Get)
		.post(ControllerFrelanser(infoApp).RequestAdd_Post);

	router
		.route("/request/:requestId/edit")
		.get(ControllerFrelanser(infoApp).RequestEdit_Get)
		.post(ControllerFrelanser(infoApp).RequestEdit_Post);

	router
		.route("/request/:requestId/del")
		.get(ControllerFrelanser(infoApp).RequestDelete_Get);

	router.route("/invoices").get(ControllerFrelanser(infoApp).Invoices_Get);

	router
		.route("/invoices/archived")
		.get(ControllerFrelanser(infoApp).Invoices_Get);

	router
		.route("/invoice/:invoiceId")
		.get(ControllerFrelanser(infoApp).InvoiceDetail_Get)
		.post(ControllerFrelanser(infoApp).InvoiceDetail_Post);

	router
		.route("/invoice/:invoiceId/print")
		.get(ControllerFrelanser(infoApp).InvoicePrint_Get);

	// router
	// 	.route("/todo/add")
	// 	.get(ControllerFrelanser(infoApp).detailProjectGet)
	// 	.post(ControllerFrelanser(infoApp).detailProjectPost);

	// router
	// 	.route("/todo/:id/edit")
	// 	.get(ControllerFrelanser(infoApp).detailProjectGet)
	// 	.post(ControllerFrelanser(infoApp).detailProjectPost);

	// router
	// 	.route("/todo/:id/del")
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

	router.route("/profile").get(ControllerFrelanser(infoApp).Profile_Get);

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
