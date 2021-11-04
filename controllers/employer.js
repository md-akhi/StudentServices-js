//import { * as Model } from "../models/project.js";
import {
	Project as ModelProject,
	Request as ModelRequest,
	Invoice as ModelInvoice,
	Payment as ModelPayment,
} from "../models/project.js";
import {
	templateCustomer as Template,
	pathCustomer as Path,
} from "../config/routes.cjs";
import Middleware from "../controllers/middleware.js";
import PaymentIDPay from "../config/pay.js";
import async from "async";

export default function (infoApp) {
	// middleware function to check for logged-in users
	return {
		// Display Root form on GET.
		Root_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				res.render(Template.Employer(), {
					name: "employer",
				});
			},
		],

		Projects_Get: [
			Middleware(infoApp).LogInChecker,
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

		// Display Project add form on GET.
		ProjectAdd_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				res.render(Template.Employer() + "/project_add", {
					name: "employer",
				});
			},
		],
		// Handle Project add on POST.
		ProjectAdd_Post: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				const { name, description, status, company, budget, total, duration } =
					req.body;

				let newPoroject = new ModelProject({
					userId: userId,
					name: name,
					description: description,
					status: status,
					budget: budget,
					total: total,
					duration: duration,
					// payId: payId,
					// request: request,
					// Progress: Progress,
					// date: date,
				});

				newPoroject
					.save(newPoroject)
					.then((poroject) => {
						// REDIRECT TO THE project
						res.redirect(Path.Employer() + "/projects");
					})
					.catch((err) => {
						res.render(Template.Employer() + "/project_add", {
							message: "failed set to db",
						});
					});
			},
		],

		ProjectEdit_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
				ModelProject.findOne(
					{ _id: id, userId: userId },
					function (err, project) {
						if (!project) res.redirect(Path.Employer() + "/projects");
						res.render(Template.Employer() + "/project_add", {
							data: project,
							isEdit: true,
						});
					}
				);
			},
		],
		ProjectEdit_Post: [
			Middleware(infoApp).LogInChecker,
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
				ModelProject.findOne({ _id: id, userId: userId }, function (err, edit) {
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
				res.redirect(Path.Employer() + "/projects");
			},
		],

		ProjectDelete_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let id = req.params.id;
				ModelProject.findByIdAndDelete(id, function (err) {
					if (err) console.log(err);
					console.log("Successful deletion");
				});
				// REDIRECT TO THE project
				res.redirect(Path.Employer() + "/projects");
			},
		],

		ProjectDetail_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let projectId = req.params.projectId;
				async
					.parallel({
						requests: function (callback) {
							ModelRequest.find({ projectId: projectId })
								.populate("userId")
								.exec(callback);
						},
						project: function (callback) {
							ModelProject.findOne({ _id: projectId, userId: userId }).exec(
								callback
							);
						},
					})
					.then((results) => {
						if (results.project == null) {
							// No results.
							var err = new Error("Project not found");
							err.status = 404;
							//return next(err);
							res.redirect(Path.Employer() + "/projects");
						}
						// Successful, so render.
						res.render(Template.Employer() + "/project_detail", {
							data: results.project,
							requests: results.requests,
						});
					})
					.catch((err) => {
						console.log(err);
						if (err) {
							return next(err);
						}
					});
			},
		],

		RequestSet_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let projectId = req.params.projectId;
				let requestId = req.params.requestId;

				async
					.parallel({
						request: function (callback) {
							ModelRequest.findOne({
								_id: requestId,
								projectId: projectId,
							}).exec(callback);
						},
						project: function (callback) {
							ModelProject.findOne({ _id: projectId, userId: userId }).exec(
								callback
							);
						},
					})
					.then((results) => {
						if (results.project.frelancerId != undefined) {
							// No results.
							var err = new Error("Project set frelancer");
							err.status = 404;
							//return next(err);
							res.redirect(Path.Employer() + "/projects");
						}
						ModelProject.findOne({ _id: projectId }, (err, update) => {
							update.frelancerId = results.request.userId;
							update.save();
						});
						let newInvoice = new ModelInvoice({
							employerId: userId,
							frelancerId: results.request.userId,
							projectId: projectId,
							requestId: results.request.id,
						});
						newInvoice.save();
						// Successful, so render.
						res.redirect(Path.Employer() + "/project/" + projectId + "/detail");
					})
					.catch((err) => {
						console.log(err);
						if (err) {
							//return next(err);
						}
					});
			},
		],
		RequestDelete_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let projectId = req.params.projectId;
				let frelancerId = req.params.frelancerId;
				ModelProject.findOneAndDelete(
					{ _id: projectId, userId: userId },
					{ frelancerId: frelancerId },
					function (err, project) {
						res.redirect(Path.Employer() + "/projects");
					}
				);
			},
		],

		Invoices_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				ModelInvoice.find({
					employerId: userId,
				})
					.populate("projectId")
					.then(function (invoices) {
						res.render(Template.Employer() + "/invoice_list", {
							data: invoices,
						});
					})
					.catch(function (err) {
						if (err) console.log(err);
					});
			},
		],

		InvoiceDetail_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let invoiceId = req.params.invoiceId;
				ModelInvoice.findOne({
					_id: invoiceId,
					employerId: userId,
				})
					.populate("projectId")
					.populate("requestId")
					.populate("employerId")
					.populate("frelancerId")
					.then(function (invoice) {
						res.render(Template.Employer() + "/invoice_detail", {
							data: invoice,
						});
					})
					.catch(function (err) {
						if (err) console.log(err);
					});
			},
		],
		InvoiceDetail_Post: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let invoiceId = req.params.invoiceId;
			},
		],

		InvoicePayment_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				rId = infoApp.session.user.id;
				let invoiceId = req.params.invoiceId;
				ModelInvoice.findOne({
					//ModelPayment
					_id: invoiceId,
					frelancerId: userId,
				})
					.populate("projectId")
					.populate("employerId")
					.then(function (invoice) {
						// res.render(Template.Frelanser() + "/invoice_detail", {
						// 	data: invoice,
						// });
						let IDPay = new PaymentIDPay(
							req.env.IDPAY_API_KEY,
							{
								payment: req.env.IDPAY_PAYMENT,
								verify: req.env.IDPAY_VERIFY,
								inquiry: req.env.IDPAY_INQUIRY,
							},
							req.env.IDPAY_SANDBOX
						);
						IDPay.payment("http://localhost:9000/dash/verify", orderId, data)
							.then((body) => {
								console.log(body);
							})
							.catch((err) => {
								console.log(err);
							});
					})
					.catch(function (err) {
						if (err) console.log(err);
					});
			},
		],

		Invoiceverify_Post: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				rId = infoApp.session.user.id;
				let invoiceId = req.params.invoiceId;
				ModelPayment.findOne({
					//ModelPayment
					_id: invoiceId,
					userId: userId,
				});
				ModelInvoice.findOne({
					//ModelPayment
					_id: invoiceId,
					frelancerId: userId,
				})
					.populate("projectId")
					.populate("employerId")
					.then(function (invoice) {
						// res.render(Template.Frelanser() + "/invoice_detail", {
						// 	data: invoice,
						// });
						let IDPay = new PaymentIDPay(
							req.env.IDPAY_API_KEY,
							{
								payment: req.env.IDPAY_PAYMENT,
								verify: req.env.IDPAY_VERIFY,
								inquiry: req.env.IDPAY_INQUIRY,
							},
							req.env.IDPAY_SANDBOX
						);
						IDPay.Verify(trackId, orderId)
							.then((body) => {
								console.log(body);
							})
							.catch((err) => {
								console.log(err);
							});
					})
					.catch(function (err) {
						if (err) console.log(err);
					});
			},
		],

		InvoicePrint_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let invoiceId = req.params.invoiceId;
				res.render(Template.Employer() + "/invoice_print", {
					name: "employer",
				});
			},
		],

		// archivesGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 		// REDIRECT TO THE project
		// 		res.redirect(Path.Employer() + "/project/archive");
		// 	},
		// ],
		// archivesPost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 		const { status } = req.body;
		// 		ModelProject.findById(id, function (err, edit) {
		// 			edit.status = status;
		// 			edit.save();
		// 		});
		// 		// REDIRECT TO THE project
		// 		res.redirect(Path.Employer() + "/project/archives");
		// 	},
		// ],

		// fileGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// filePost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// taskGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// taskPost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// bugGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// bugPost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// noteGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// notePost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// paymentGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// paymentPost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// invoiceGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// invoicePost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// todosGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// todosPost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// addTodoGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// addTodoPost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// editTodoGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// editTodoPost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// deleteTodoGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// deleteTodoPost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// doneTodoGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// doneTodoPost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// orderTodoGet: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// orderTodoPost: [
		// 	Middleware(infoApp).LogInChecker,
		// 	function (req, res) {
		// 		let userId = infoApp.session.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		profileGet: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				res.render(Template.Employer() + "/user_detail", {
					name: "Employer",
				});
			},
		],
	};
}
