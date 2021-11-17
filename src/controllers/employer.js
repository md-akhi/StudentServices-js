import React from "react";
import { renderToString } from "react-dom/server";
//import { * as Model } from "../models/project.js";
import {
	Project as ProjectModel,
	Request as RequestModel,
	Invoice as InvoiceModel,
	Payment as PaymentModel,
} from "../models/project.js";
import {
	customerTemplate as Template,
	customerPath as Path,
} from "../config/routes.js";
import Middleware from "../controllers/middleware.js";
import PaymentIDPay from "../config/pay.js";
import async from "async";
import EmployerReact from "../views/customer/dashboard/employer";
import ProjectListReact from "../views/customer/dashboard/employer/project_list";
import ProjectAddReact from "../views/customer/dashboard/employer/project_add";
import ProjectDetailReact from "../views/customer/dashboard/employer/project_detail";
import InvoiceListReact from "../views/customer/dashboard/employer/invoice_list";
import InvoiceDetailReact from "../views/customer/dashboard/employer/invoice_detail";
import InvoicePrintReact from "../views/customer/dashboard/employer/invoice_print";
import UserDetailReact from "../views/customer/dashboard/employer/user_detail";

export default function (infoApp) {
	// middleware function to check for logged-in users
	return {
		// Display Root form on GET.
		Root_Get: [
			function (req, res) {
				const RenderReact = renderToString(<EmployerReact name="employer" />);
				res.render(Template.Employer(), {
					reactApp: RenderReact,
				});
			},
		],

		Projects_Get: [
			function (req, res) {
				let userId = infoApp.user.id;
				ProjectModel.find(
					{
						userId: userId,
					},
					function (err, Project) {
						const RenderReact = renderToString(
							<ProjectListReact list={Project} />
						);
						res.render(Template.Employer() + "/project_list", {
							reactApp: RenderReact,
						});
					}
				);
			},
		],

		// Display Project add form on GET.
		ProjectAdd_Get: [
			function (req, res) {
				const RenderReact = renderToString(
					<ProjectAddReact name={"employer"} />
				);
				res.render(Template.Employer() + "/project_add", {
					reactApp: RenderReact,
				});
			},
		],
		// Handle Project add on POST.
		ProjectAdd_Post: [
			function (req, res) {
				let userId = infoApp.user.id;
				const { name, description, status, company, budget, total, duration } =
					req.body;

				let newPoroject = new ProjectModel({
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
			function (req, res) {
				let userId = infoApp.user.id;
				let id = req.params.id;
				ProjectModel.findOne(
					{ _id: id, userId: userId },
					function (err, project) {
						if (!project) res.redirect(Path.Employer() + "/projects");
						const RenderReact = renderToString(
							<ProjectAddReact data={project} isEdit={true} />
						);
						res.render(Template.Employer() + "/project_add", {
							reactApp: RenderReact,
						});
					}
				);
			},
		],
		ProjectEdit_Post: [
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
				ProjectModel.findOne({ _id: id, userId: userId }, function (err, edit) {
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
			function (req, res) {
				let id = req.params.id;
				ProjectModel.findByIdAndDelete(id, function (err) {
					if (err) console.log(err);
					console.log("Successful deletion");
				});
				// REDIRECT TO THE project
				res.redirect(Path.Employer() + "/projects");
			},
		],

		ProjectDetail_Get: [
			function (req, res) {
				let userId = infoApp.user.id;
				let projectId = req.params.projectId;
				async
					.parallel({
						requests: function (callback) {
							RequestModel.find({ projectId: projectId })
								.populate("userId")
								.exec(callback);
						},
						project: function (callback) {
							ProjectModel.findOne({ _id: projectId, userId: userId }).exec(
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
						const RenderReact = renderToString(
							<ProjectDetailReact
								data={results.project}
								requests={results.requests}
							/>
						);
						res.render(Template.Employer() + "/project_detail", {
							reactApp: RenderReact,
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
			function (req, res) {
				let userId = infoApp.user.id;
				let projectId = req.params.projectId;
				let requestId = req.params.requestId;

				async
					.parallel({
						request: function (callback) {
							RequestModel.findOne({
								_id: requestId,
								projectId: projectId,
							}).exec(callback);
						},
						project: function (callback) {
							ProjectModel.findOne({ _id: projectId, userId: userId }).exec(
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
						ProjectModel.findOne({ _id: projectId }, (err, update) => {
							update.frelancerId = results.request.userId;
							update.save();
						});
						let newInvoice = new InvoiceModel({
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
			function (req, res) {
				let userId = infoApp.user.id;
				let projectId = req.params.projectId;
				let frelancerId = req.params.frelancerId;
				ProjectModel.findOneAndDelete(
					{ _id: projectId, userId: userId },
					{ frelancerId: frelancerId },
					function (err, project) {
						res.redirect(Path.Employer() + "/projects");
					}
				);
			},
		],

		Invoices_Get: [
			function (req, res) {
				let userId = infoApp.user.id;
				InvoiceModel.find({
					employerId: userId,
				})
					.populate("projectId")
					.then(function (invoices) {
						const RenderReact = renderToString(
							<InvoiceListReact data={invoices} />
						);
						res.render(Template.Employer() + "/invoice_list", {
							reactApp: RenderReact,
						});
					})
					.catch(function (err) {
						if (err) console.log(err);
					});
			},
		],

		InvoiceDetail_Get: [
			function (req, res) {
				let userId = infoApp.user.id;
				let invoiceId = req.params.invoiceId;
				InvoiceModel.findOne({
					_id: invoiceId,
					employerId: userId,
				})
					.populate("projectId")
					.populate("requestId")
					.populate("employerId")
					.populate("frelancerId")
					.then(function (invoice) {
						const RenderReact = renderToString(
							<InvoiceDetailReact data={invoice} />
						);
						res.render(Template.Employer() + "/invoice_detail", {
							reactApp: RenderReact,
						});
					})
					.catch(function (err) {
						if (err) console.log(err);
					});
			},
		],
		InvoiceDetail_Post: [
			function (req, res) {
				let userId = infoApp.user.id;
				let invoiceId = req.params.invoiceId;
			},
		],

		InvoicePayment_Get: [
			function (req, res) {
				rId = infoApp.user.id;
				let invoiceId = req.params.invoiceId;
				InvoiceModel.findOne({
					//PaymentModel
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
			function (req, res) {
				rId = infoApp.user.id;
				let invoiceId = req.params.invoiceId;
				PaymentModel.findOne({
					//PaymentModel
					_id: invoiceId,
					userId: userId,
				});
				InvoiceModel.findOne({
					//PaymentModel
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
			function (req, res) {
				let userId = infoApp.user.id;
				let invoiceId = req.params.invoiceId;
				const RenderReact = renderToString(
					<InvoicePrintReact name={"employer"} />
				);
				res.render(Template.Employer() + "/invoice_print", {
					reactApp: RenderReact,
				});
			},
		],

		// archivesGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 		// REDIRECT TO THE project
		// 		res.redirect(Path.Employer() + "/project/archive");
		// 	},
		// ],
		// archivesPost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 		const { status } = req.body;
		// 		ProjectModel.findById(id, function (err, edit) {
		// 			edit.status = status;
		// 			edit.save();
		// 		});
		// 		// REDIRECT TO THE project
		// 		res.redirect(Path.Employer() + "/project/archives");
		// 	},
		// ],

		// fileGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// filePost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// taskGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// taskPost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// bugGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// bugPost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// noteGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// notePost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// paymentGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// paymentPost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// invoiceGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// invoicePost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// todosGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// todosPost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// addTodoGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// addTodoPost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// editTodoGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// editTodoPost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// deleteTodoGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// deleteTodoPost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// doneTodoGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// doneTodoPost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		// orderTodoGet: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],
		// orderTodoPost: [
		//
		// 	function (req, res) {
		// 		let userId = infoApp.user.id;
		// 		let id = req.params.id;
		// 	},
		// ],

		profileGet: [
			function (req, res) {
				const RenderReact = renderToString(
					<UserDetailReact name={"Employer"} />
				);
				res.render(Template.Employer() + "/user_detail", {
					reactApp: RenderReact,
				});
			},
		],
	};
}
