import Express from "express";
import Middleware from "../controllers/middleware.js";
import FrelanserController from "../controllers/frelanser.js";

export default function (infoApp) {
	let Router = Express.Router();

	Router.route("/").get(FrelanserController(infoApp).Root_Get);

	Router.route("/requests").get(FrelanserController(infoApp).Requests_Get);

	Router.route("/project/:projectId/request/add")
		.get(FrelanserController(infoApp).RequestAdd_Get)
		.post(FrelanserController(infoApp).RequestAdd_Post);

	Router.route("/request/:requestId/edit")
		.get(FrelanserController(infoApp).RequestEdit_Get)
		.post(FrelanserController(infoApp).RequestEdit_Post);

	Router.route("/request/:requestId/del").get(
		FrelanserController(infoApp).RequestDelete_Get
	);

	Router.route("/invoices").get(FrelanserController(infoApp).Invoices_Get);

	Router.route("/invoices/archived").get(
		FrelanserController(infoApp).Invoices_Get
	);

	Router.route("/invoice/:invoiceId").get(
		FrelanserController(infoApp).InvoiceDetail_Get
	);

	Router.route("/invoice/:invoiceId/print").get(
		FrelanserController(infoApp).InvoicePrint_Get
	);

	// Router
	// 	.route("/todo/add")
	// 	.get(FrelanserController(infoApp).detailProjectGet)
	// 	.post(FrelanserController(infoApp).detailProjectPost);

	// Router
	// 	.route("/todo/:id/edit")
	// 	.get(FrelanserController(infoApp).detailProjectGet)
	// 	.post(FrelanserController(infoApp).detailProjectPost);

	// Router
	// 	.route("/todo/:id/del")
	// 	.get(FrelanserController(infoApp).getDetailProject)
	// 	.post(FrelanserController(infoApp).postDetailProject);

	// Router
	// 	.route("/project/:id/file")
	// 	.get(FrelanserController(infoApp).getEditProject)
	// 	.post(FrelanserController(infoApp).postEditProject);

	// Router
	// 	.route("/project/:id/bug")
	// 	.get(FrelanserController(infoApp).getEditProject)
	// 	.post(FrelanserController(infoApp).postEditProject);

	// Router
	// 	.route("/project/archived")
	// 	.get(FrelanserController(infoApp).getEditProject)
	// 	.post(FrelanserController(infoApp).postEditProject);

	// Router
	// 	.route("/project/payment")
	// 	.get(FrelanserController(infoApp).getEditProject)
	// 	.post(FrelanserController(infoApp).postEditProject);

	Router.route("/profile").get(FrelanserController(infoApp).Profile_Get);

	// Router
	// 	.route("/tickets")
	// 	.get(FrelanserController(infoApp).orderTodoGet)
	// 	.post(FrelanserController(infoApp).orderTodoPost);

	// Router
	// 	.route("/ticket/:id")
	// 	.get(FrelanserController(infoApp).orderTodoGet)
	// 	.post(FrelanserController(infoApp).orderTodoPost);

	return Router;
}
