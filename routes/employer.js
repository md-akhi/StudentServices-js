import express from "express";
import Middleware from "../controllers/middleware.js";
import ControllerEmployer from "../controllers/employer.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Middleware(infoApp).SessionChecker);

	// root
	router.route("/").get(ControllerEmployer(infoApp).Root_Get);

	router.route("/projects").get(ControllerEmployer(infoApp).Projects_Get);
	router
		.route("/projects/archived")
		.get(ControllerEmployer(infoApp).Projects_Get);

	router
		.route("/project/add")
		.get(ControllerEmployer(infoApp).ProjectAdd_Get)
		.post(ControllerEmployer(infoApp).ProjectAdd_Post);

	router
		.route("/project/:id/edit")
		.get(ControllerEmployer(infoApp).ProjectEdit_Get)
		.post(ControllerEmployer(infoApp).ProjectEdit_Post);

	router
		.route("/project/:id/del")
		.get(ControllerEmployer(infoApp).ProjectDelete_Get);

	router
		.route("/project/:projectId/detail")
		.get(ControllerEmployer(infoApp).ProjectDetail_Get);

	router
		.route("/project/:projectId/set/:requestId")
		.get(ControllerEmployer(infoApp).RequestSet_Get);

	router
		.route("/project/:projectId/del/:requestId")
		.get(ControllerEmployer(infoApp).RequestDelete_Get);

	router.route("/invoices").get(ControllerEmployer(infoApp).Invoices_Get);

	router
		.route("/invoices/archived")
		.get(ControllerEmployer(infoApp).Invoices_Get);

	router
		.route("/invoice/:invoiceId")
		.get(ControllerEmployer(infoApp).InvoiceDetail_Get);

	router
		.route("/invoice/:invoiceId/pay")
		.get(ControllerEmployer(infoApp).InvoicePayment_Get);

	router
		.route("/invoice/:invoiceId/verify")
		.post(ControllerEmployer(infoApp).Invoiceverify_Post);

	router
		.route("/invoice/:invoiceId/print")
		.get(ControllerEmployer(infoApp).InvoicePrint_Get);

	// router
	// 	.route("/project/archives")
	// 	.get(ControllerEmployer(infoApp).archivesGet)
	// 	.post(ControllerEmployer(infoApp).archivesPost);

	// router
	// 	.route("/file/:id")
	// 	.get(ControllerEmployer(infoApp).fileGet)
	// 	.post(ControllerEmployer(infoApp).filePost);

	// router
	// 	.route("/task/:id")
	// 	.get(ControllerEmployer(infoApp).taskGet)
	// 	.post(ControllerEmployer(infoApp).taskPost);

	// router
	// 	.route("/bug/:id")
	// 	.get(ControllerEmployer(infoApp).bugGet)
	// 	.post(ControllerEmployer(infoApp).bugPost);

	// router
	// 	.route("/note/:id")
	// 	.get(ControllerEmployer(infoApp).noteGet)
	// 	.post(ControllerEmployer(infoApp).notePost);

	// router
	// 	.route("/payment")
	// 	.get(ControllerEmployer(infoApp).paymentGet)
	// 	.post(ControllerEmployer(infoApp).paymentPost);

	// router
	// 	.route("/todos")
	// 	.get(ControllerEmployer(infoApp).todosGet)
	// 	.post(ControllerEmployer(infoApp).todosPost);

	// router
	// 	.route("/todo/add")
	// 	.get(ControllerEmployer(infoApp).addTodoGet)
	// 	.post(ControllerEmployer(infoApp).addTodoPost);

	// router
	// 	.route("/todo/:id/edit")
	// 	.get(ControllerEmployer(infoApp).editTodoGet)
	// 	.post(ControllerEmployer(infoApp).editTodoPost);

	// router
	// 	.route("/todo/:id/del")
	// 	.get(ControllerEmployer(infoApp).deleteTodoGet)
	// 	.post(ControllerEmployer(infoApp).deleteTodoPost);

	// router
	// 	.route("/todo/:id/done")
	// 	.get(ControllerEmployer(infoApp).doneTodoGet)
	// 	.post(ControllerEmployer(infoApp).doneTodoPost);

	// router
	// 	.route("/todo/:id/order")
	// 	.get(ControllerEmployer(infoApp).orderTodoGet)
	// 	.post(ControllerEmployer(infoApp).orderTodoPost);

	// router
	// 	.route("/tickets")
	// 	.get(ControllerEmployer(infoApp).orderTodoGet)
	// 	.post(ControllerEmployer(infoApp).orderTodoPost);

	// router
	// 	.route("/ticket/:id")
	// 	.get(ControllerEmployer(infoApp).orderTodoGet)
	// 	.post(ControllerEmployer(infoApp).orderTodoPost);

	router.route("/profile").get(ControllerEmployer(infoApp).profileGet);

	return router;
}
