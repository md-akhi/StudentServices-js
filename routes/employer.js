let router = require("express").Router();

module.exports = function (infoApp) {
	// middleware function
	let Mid = require("../controllers/middleware")(infoApp);
	router.use(Mid.sessionChecker);

	// controller
	const CEmployer = require("../controllers/employer")(infoApp);

	// root
	router.route("/").get(CEmployer.getRoot);

	router.route("/project").get(CEmployer.getProject);

	router
		.route("/project/add")
		.get(CEmployer.getAddProject)
		.post(CEmployer.postAddProject);

	router
		.route("/project/edit/:id")
		.get(CEmployer.getEditProject)
		.post(CEmployer.postEditProject);

	router
		.route("/project/detail/:id")
		.get(CEmployer.getDetailProject)
		.post(CEmployer.postDetailProject);

	router.route("/project/del/:id").get(CEmployer.getDeleteProject);

	router
		.route("/invoice/:id")
		.get(CEmployer.getInvoiceProject)
		.post(CEmployer.postInvoiceProject);

	router
		.route("/invoice/print/:id")
		.get(CEmployer.getInvoicePrintProject);

	return router;
};
