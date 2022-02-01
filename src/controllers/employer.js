import React from "react";
import { renderToString } from "react-dom/server";
import async from "async";
//import { * as Model } from "../models/project.js";
import {
	Project as ProjectModel,
	Request as RequestModel,
	Invoice as InvoiceModel,
	Payment as PaymentModel,
	File as FileModel,
} from "../models/project.js";
import {
	customerTemplate as Template,
	customerPath as Path,
} from "../routes/routes.js";
import Middleware from "../controllers/middleware.js";
import PaymentIDPay from "../config/pay.js";
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
					data: JSON.stringify({ name: "employer" }),
				});
			},
		],

		Projects_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;

				async
					.parallel({
						invoices: function (callback) {
							InvoiceModel.find({ employerId: userId }).exec(callback);
						},
						projects: function (callback) {
							ProjectModel.find({ userId: userId }).exec(callback);
						},
					})
					.then((results) => {
						const { invoices = null, projects = null } = results;
						if (projects == null) {
							// No results.
							var err = new Error("Project not found");
							err.status = 404;
							//return next(err);
							res.redirect(Path.Frelanser() + "/projects");
						}
						// Successful, so render.
						const RenderReact = renderToString(
							<ProjectListReact list={projects} Invoices={invoices} />
						);
						res.render(Template.Employer() + "/project_list", {
							reactApp: RenderReact,
							data: JSON.stringify({ list: projects, Invoices: invoices }),
						});
					})
					.catch((err) => {
						console.error(err);
					});
			},
		],

		// Display Project add form on GET.
		ProjectAdd_Get: [
			function (req, res) {
				const RenderReact = renderToString(
					<ProjectAddReact data={{}} isEdit={false} />
				);
				res.render(Template.Employer() + "/project_add", {
					reactApp: RenderReact,
					data: JSON.stringify({ data: {}, isEdit: false }),
				});
			},
		],
		// Handle Project add on POST.
		ProjectAdd_Post: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const { name, description, status, company, budget, total, duration } =
					req.body;

				const newPoroject = new ProjectModel({
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
				const { id: userId = 0 } = infoApp.user;
				const id = req.params.id;
				ProjectModel.findOne(
					{ _id: id, userId: userId },
					function (err, project) {
						if (!project) res.redirect(Path.Employer() + "/projects");
						const RenderReact = renderToString(
							<ProjectAddReact data={project} isEdit={true} />
						);
						res.render(Template.Employer() + "/project_add", {
							reactApp: RenderReact,
							data: JSON.stringify({ data: project, isEdit: true }),
						});
					}
				);
			},
		],
		ProjectEdit_Post: [
			function (req, res) {
				const id = req.params.id;
				const { id: userId = 0 } = infoApp.user;
				const {
					name,
					description,
					status,
					company,
					estimatedBudget,
					total,
					estimatedDuration,
				} = req.body;
				const filter = { _id: id, userId: userId };
				const update = {
					name: name,
					description: description,
					budget: estimatedBudget,
					duration: estimatedDuration,
					status: status,
					company: company,
					total: total,
				};
				ProjectModel.findOneAndUpdate(filter, update);
				// payId: payId,
				// request: request,
				// Progress: Progress,
				// date: date,
				// REDIRECT TO THE project
				res.redirect(Path.Employer() + "/projects");
			},
		],

		ProjectDelete_Get: [
			function (req, res) {
				const id = req.params.id;
				ProjectModel.findByIdAndDelete(id, function (err) {
					if (err) console.error(err);
					console.log("Successful deletion");
				});
				// REDIRECT TO THE project
				res.redirect(Path.Employer() + "/projects");
			},
		],

		ProjectDetail_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const projectId = req.params.projectId;
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
						files: function (callback) {
							FileModel.findOne({ projectId: projectId }).exec(callback);
						},
					})
					.then((results) => {
						const { requests = null, project = null, files = null } = results;
						if (project == null) {
							// No results.
							var err = new Error("Project not found");
							err.status = 404;
							//return next(err);
							res.redirect(Path.Employer() + "/projects");
						}
						// Successful, so render.
						const RenderReact = renderToString(
							<ProjectDetailReact
								data={project}
								requests={requests}
								files={files}
							/>
						);
						res.render(Template.Employer() + "/project_detail", {
							reactApp: RenderReact,
							data: JSON.stringify({
								data: project,
								requests: requests,
								files: files,
							}),
						});
					})
					.catch((err) => {
						console.error(err);
					});
			},
		],

		RequestSet_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const projectId = req.params.projectId;
				const requestId = req.params.requestId;

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
						console.error(err);
						if (err) {
							//return next(err);
						}
					});
			},
		],
		RequestDelete_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const { projectId, frelancerId } = req.params;
				ProjectModel.findOne(
					{ _id: projectId, userId: userId },
					function (err, project) {
						if (err) {
							console.log(err);
						}
						project.frelancerId = 0;
						project.save();
						//res.redirect(Path.Employer() + "/projects");
					}
				);
				InvoiceModel.findOneAndDelete(
					{ projectId: projectId },
					function (err, invoice) {
						if (err) {
							console.log(err);
						}
						console.log(invoice);
						res.redirect(Path.Employer() + "/projects");
					}
				);
			},
		],

		Invoices_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
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
							data: JSON.stringify({ data: invoices }),
						});
					})
					.catch(function (err) {
						if (err) console.error(err);
					});
			},
		],

		InvoiceDetail_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const { invoiceId = false } = req.params;
				InvoiceModel.findOne({
					_id: invoiceId,
				})
					.populate("projectId")
					.populate("requestId")
					.populate("employerId")
					.populate("frelancerId")
					.then(function (invoice) {
						const RenderReact = renderToString(
							<InvoiceDetailReact Invoice={invoice} />
						);
						res.render(Template.Employer() + "/invoice_detail", {
							reactApp: RenderReact,
							data: JSON.stringify({ Invoice: invoice }),
						});
					})
					.catch(function (err) {
						console.error(err);
					});
			},
		],
		InvoiceDetail_Post: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const invoiceId = req.params.invoiceId;
			},
		],

		InvoicePayment_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const { invoiceId } = req.params;
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
						const idPay = new PaymentIDPay(
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
								console.error(err);
							});
					})
					.catch(function (err) {
						if (err) console.error(err);
					});
			},
		],

		Invoiceverify_Post: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const invoiceId = req.params.invoiceId;
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
						const idPay = new PaymentIDPay(
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
								console.error(err);
							});
					})
					.catch(function (err) {
						if (err) console.error(err);
					});
			},
		],

		InvoicePrint_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const invoiceId = req.params.invoiceId;
				const RenderReact = renderToString(
					<InvoicePrintReact name={"employer"} />
				);
				res.render(Template.Employer() + "/invoice_print", {
					reactApp: RenderReact,
					data: JSON.stringify({ name: "employer" }),
				});
			},
		],

		// archivesGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 		// REDIRECT TO THE project
		// 		res.redirect(Path.Employer() + "/project/archive");
		// 	},
		// ],
		// archivesPost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
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
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// filePost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],

		// taskGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// taskPost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],

		// bugGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// bugPost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],

		// noteGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// notePost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],

		// paymentGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// paymentPost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],


		// todosGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// todosPost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],

		// addTodoGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// addTodoPost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],

		// editTodoGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// editTodoPost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],

		// deleteTodoGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// deleteTodoPost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],

		// doneTodoGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// doneTodoPost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],

		// orderTodoGet: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
		// 	},
		// ],
		// orderTodoPost: [
		//
		// 	function (req, res) {
		// 		const { id: userId = 0} = infoApp.user;
		// 		const id = req.params.id;
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
