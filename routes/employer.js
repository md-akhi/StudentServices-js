import Express from "express";
import Middleware from "../controllers/middleware.js";
import EmployerController from "../controllers/employer.js";

export default function (infoApp) {
	let Router = Express.Router();

	// root
	Router.route("/").get(EmployerController(infoApp).Root_Get);

	Router.route("/projects").get(EmployerController(infoApp).Projects_Get);
	Router.route("/projects/archived").get(
		EmployerController(infoApp).Projects_Get
	);

	Router.route("/project/add")
		.get(EmployerController(infoApp).ProjectAdd_Get)
		.post(EmployerController(infoApp).ProjectAdd_Post);

	Router.route("/project/:id/edit")
		.get(EmployerController(infoApp).ProjectEdit_Get)
		.post(EmployerController(infoApp).ProjectEdit_Post);

	Router.route("/project/:id/del").get(
		EmployerController(infoApp).ProjectDelete_Get
	);

	Router.route("/project/:projectId/detail").get(
		EmployerController(infoApp).ProjectDetail_Get
	);

	Router.route("/project/:projectId/set/:requestId").get(
		EmployerController(infoApp).RequestSet_Get
	);

	Router.route("/project/:projectId/del/:requestId").get(
		EmployerController(infoApp).RequestDelete_Get
	);

	Router.route("/invoices").get(EmployerController(infoApp).Invoices_Get);

	Router.route("/invoices/archived").get(
		EmployerController(infoApp).Invoices_Get
	);

	Router.route("/invoice/:invoiceId").get(
		EmployerController(infoApp).InvoiceDetail_Get
	);

	Router.route("/invoice/:invoiceId/pay").get(
		EmployerController(infoApp).InvoicePayment_Get
	);

	Router.route("/invoice/:invoiceId/verify").post(
		EmployerController(infoApp).Invoiceverify_Post
	);

	Router.route("/invoice/:invoiceId/print").get(
		EmployerController(infoApp).InvoicePrint_Get
	);

	// Router
	// 	.route("/project/archives")
	// 	.get(EmployerController(infoApp).archivesGet)
	// 	.post(EmployerController(infoApp).archivesPost);

	// Router
	// 	.route("/file/:id")
	// 	.get(EmployerController(infoApp).fileGet)
	// 	.post(EmployerController(infoApp).filePost);

	// Router
	// 	.route("/task/:id")
	// 	.get(EmployerController(infoApp).taskGet)
	// 	.post(EmployerController(infoApp).taskPost);

	// Router
	// 	.route("/bug/:id")
	// 	.get(EmployerController(infoApp).bugGet)
	// 	.post(EmployerController(infoApp).bugPost);

	// Router
	// 	.route("/note/:id")
	// 	.get(EmployerController(infoApp).noteGet)
	// 	.post(EmployerController(infoApp).notePost);

	// Router
	// 	.route("/payment")
	// 	.get(EmployerController(infoApp).paymentGet)
	// 	.post(EmployerController(infoApp).paymentPost);

	// Router
	// 	.route("/todos")
	// 	.get(EmployerController(infoApp).todosGet)
	// 	.post(EmployerController(infoApp).todosPost);

	// Router
	// 	.route("/todo/add")
	// 	.get(EmployerController(infoApp).addTodoGet)
	// 	.post(EmployerController(infoApp).addTodoPost);

	// Router
	// 	.route("/todo/:id/edit")
	// 	.get(EmployerController(infoApp).editTodoGet)
	// 	.post(EmployerController(infoApp).editTodoPost);

	// Router
	// 	.route("/todo/:id/del")
	// 	.get(EmployerController(infoApp).deleteTodoGet)
	// 	.post(EmployerController(infoApp).deleteTodoPost);

	// Router
	// 	.route("/todo/:id/done")
	// 	.get(EmployerController(infoApp).doneTodoGet)
	// 	.post(EmployerController(infoApp).doneTodoPost);

	// Router
	// 	.route("/todo/:id/order")
	// 	.get(EmployerController(infoApp).orderTodoGet)
	// 	.post(EmployerController(infoApp).orderTodoPost);

	// Router
	// 	.route("/tickets")
	// 	.get(EmployerController(infoApp).orderTodoGet)
	// 	.post(EmployerController(infoApp).orderTodoPost);

	// Router
	// 	.route("/ticket/:id")
	// 	.get(EmployerController(infoApp).orderTodoGet)
	// 	.post(EmployerController(infoApp).orderTodoPost);

	Router.route("/profile").get(EmployerController(infoApp).profileGet);

	return Router;
}
