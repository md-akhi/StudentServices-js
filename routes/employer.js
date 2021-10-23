import express from "express";
import Middleware from "../controllers/middleware.js";
import ControllerEmployer from "../controllers/employer.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Middleware(infoApp).sessionChecker);

	// root
	router.route("/").get(ControllerEmployer(infoApp).rootGet);

	router.route("/projects").get(ControllerEmployer(infoApp).projectsGet);

	router
		.route("/project/add")
		.get(ControllerEmployer(infoApp).addProjectGet)
		.post(ControllerEmployer(infoApp).addProjectPost);

	router
		.route("/project/:id/edit")
		.get(ControllerEmployer(infoApp).editProjectGet)
		.post(ControllerEmployer(infoApp).editProjectPost);

	router
		.route("/project/:id/del")
		.get(ControllerEmployer(infoApp).deleteProjectGet);

	router
		.route("/project/:id/detail")
		.get(ControllerEmployer(infoApp).detailProjectGet)
		.post(ControllerEmployer(infoApp).detailProjectPost);

	router.route("/invoices").get(ControllerEmployer(infoApp).invoicesGet);

	router
		.route("/invoice/:id")
		.get(ControllerEmployer(infoApp).invoiceGet)
		.post(ControllerEmployer(infoApp).invoicePost);

	router
		.route("/invoice/:id/print")
		.get(ControllerEmployer(infoApp).invoicePrintGet);

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
