import { Project as ModelProject } from "../models/project.js";
//import MEmployer from "../models/employer.js";
import {
	templateCustomer as Template,
	pathCustomer as Path,
} from "../config/routes.cjs";
import Middleware from "../controllers/middleware.js";

export default function (infoApp) {
	// middleware function to check for logged-in users
	return {
		rootGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				res.render(Template.Employer(), {
					name: "employer",
				});
			},
		],

		projectsGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				ModelProject.find(
					{
						userId: userId,
					},
					function (err, Project) {
						res.render(Template.Employer() + "/project_list", {
							list: Project,
						});
					}
				);
			},
		],

		addProjectGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				res.render(Template.Employer() + "/project_add", {
					name: "employer",
				});
			},
		],
		addProjectPost: [
			Middleware(infoApp).logInChecker,
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

				let newPoroject = new ModelProject({
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
						res.redirect(Path.Employer() + "/project");
					})
					.catch((err) => {
						res.render(Template.Employer() + "/project_add", {
							message: "failed set to db",
						});
					});
			},
		],

		editProjectGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
				ModelProject.find({ _id: id, userId: userId }, function (err, project) {
					if (!project[0]) res.redirect(Path.Employer() + "/project");
					res.render(Template.Employer() + "/project_add", {
						data: project[0],
						isEdit: true,
					});
				});
			},
		],
		editProjectPost: [
			Middleware(infoApp).logInChecker,
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
				ModelProject.findById(id, function (err, edit) {
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
				res.redirect(Path.Employer() + "/project");
			},
		],

		deleteProjectGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let id = req.params.id;
				ModelProject.findByIdAndDelete(id, function (err) {
					if (err) console.log(err);
					console.log("Successful deletion");
				});
				// REDIRECT TO THE project
				res.redirect(Path.Employer() + "/project");
			},
		],

		detailProjectGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
				ModelProject.find({ _id: id, userId: userId }, function (err, project) {
					if (!project[0]) res.redirect(Path.Employer() + "/project");
					res.render(Template.Employer() + "/project_detail", {
						data: project[0],
					});
				});
			},
		],
		detailProjectPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		invoicesGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
				res.render(Template.Employer() + "/invoice", {
					name: "employer",
				});
			},
		],
		invoicesPost: [Middleware(infoApp).logInChecker, function (req, res) {}],

		invoicePrintGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
				res.render(Template.Employer() + "/invoice_print", {
					name: "employer",
				});
			},
		],

		archivesGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
				// REDIRECT TO THE project
				res.redirect(Path.Employer() + "/project/archive");
			},
		],
		archivesPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
				const { status } = req.body;
				ModelProject.findById(id, function (err, edit) {
					edit.status = status;
					edit.save();
				});
				// REDIRECT TO THE project
				res.redirect(Path.Employer() + "/project/archives");
			},
		],

		fileGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		filePost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		taskGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		taskPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		bugGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		bugPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		noteGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		notePost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		paymentGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		paymentPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		invoiceGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		invoicePost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		todosGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		todosPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		addTodoGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		addTodoPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		editTodoGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		editTodoPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		deleteTodoGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		deleteTodoPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		doneTodoGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		doneTodoPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		orderTodoGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
		orderTodoPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],

		profileGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
			},
		],
	};
}
