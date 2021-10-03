import MProject from "../models/project.js";
//import MEmployer from "../models/employer.js";
import { templateCustomer } from "../config/routes.cjs";
import Mid from "../controllers/middleware.js";

export default function (infoApp) {
	// middleware function to check for logged-in users
	return {
		getRoot: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Employer(), {
					name: "employer",
				});
			},
		],

		getProject: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				MProject.find(
					{
						userId: userId,
					},
					function (err, Project) {
						res.render(templateCustomer.Employer() + "/project_list", {
							list: Project,
						});
					}
				);
			},
		],

		getAddProject: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Employer() + "/project_add", {
					name: "employer",
				});
			},
		],
		postAddProject: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				const {
					name,
					description,
					status,
					company,
					estimated,
					total,
					duration,
				} = req.body;

				let newPoroject = new MProject({
					userId: infoApp.session.user.id,
					name: name,
					description: description,
					status: status,
					estimatedBudget: estimated,
					estimatedDuration: duration,
					// payId: payId,
					// request: request,
					// Progress: Progress,
					// date: date,
				});

				newPoroject
					.save(newPoroject)
					.then((poroject) => {
						// REDIRECT TO THE project
						res.redirect(pathCustomer.Employer() + "/project");
					})
					.catch((err) => {
						res.render(pathCustomer.Employer() + "/project_add", {
							message: "failed set to db",
						});
					});
			},
		],

		getEditProject: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
				MProject.find({ _id: id, userId: userId }, function (err, project) {
					if (!project[0]) res.redirect(pathCustomer.Employer() + "/project");
					res.render(templateCustomer.Employer() + "/project_add", {
						data: project[0],
						isEdit: true,
					});
				});
			},
		],
		postEditProject: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				const {
					name,
					description,
					status,
					company,
					estimated,
					total,
					duration,
				} = req.body;

				let id = req.params.id;
				MProject.findById(id, function (err, edit) {
					edit.name = name;
					edit.description = description;
					edit.estimatedBudget = estimated;
					edit.estimatedDuration = duration;
					// payId: payId,
					// request: request,
					// Progress: Progress,
					// date: date,
					edit.save();
				});
				// REDIRECT TO THE project
				res.redirect(pathCustomer.Employer() + "/project");
			},
		],

		getDetailProject: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
				MProject.find({ _id: id, userId: userId }, function (err, project) {
					if (!project[0]) res.redirect(pathCustomer.Employer() + "/project");
					res.render(templateCustomer.Employer() + "/project_detail", {
						data: project[0],
					});
				});
			},
		],
		postDetailProject: [Mid(infoApp).logInChecker, function (req, res) {}],

		getDeleteProject: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				let id = req.params.id;
				MProject.findByIdAndDelete(id, function (err) {
					if (err) console.log(err);
					console.log("Successful deletion");
				});
				// REDIRECT TO THE project
				res.redirect(pathCustomer.Employer() + "/project");
			},
		],

		getInvoiceProject: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Employer() + "/invoice", {
					name: "employer",
				});
			},
		],
		postInvoiceProject: [Mid(infoApp).logInChecker, function (req, res) {}],

		getInvoicePrintProject: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Employer() + "/invoice_print", {
					name: "employer",
				});
			},
		],
	};
}
