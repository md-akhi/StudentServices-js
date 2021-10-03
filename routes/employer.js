import express from "express";
import Mid from "../controllers/middleware.js";
import CEmployer from "../controllers/employer.js";

export default function (infoApp) {
	let router = express.Router();

	// middleware function
	router.use(Mid(infoApp).sessionChecker);

	// root
	router.route("/").get(CEmployer(infoApp).getRoot);

	router.route("/project").get(CEmployer(infoApp).getProject);

	router
		.route("/project/add")
		.get(CEmployer(infoApp).getAddProject)
		.post(CEmployer(infoApp).postAddProject);

	router
		.route("/project/edit/:id")
		.get(CEmployer(infoApp).getEditProject)
		.post(CEmployer(infoApp).postEditProject);

	router
		.route("/project/detail/:id")
		.get(CEmployer(infoApp).getDetailProject)
		.post(CEmployer(infoApp).postDetailProject);

	router.route("/project/del/:id").get(CEmployer(infoApp).getDeleteProject);

	router
		.route("/invoice/:id")
		.get(CEmployer(infoApp).getInvoiceProject)
		.post(CEmployer(infoApp).postInvoiceProject);

	router
		.route("/invoice/print/:id")
		.get(CEmployer(infoApp).getInvoicePrintProject);

	return router;
}
