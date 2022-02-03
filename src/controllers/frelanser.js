import React from "react";
import { renderToString } from "react-dom/server";
import async from "async";
//import { User as UserModel } from "../models/user.js";
//import Frelanser from "../models/frelanser.js";
//import { * as Model } from "../models/project.js";
import {
	Request as RequestModel,
	Invoice as InvoiceModel,
	File as FileModel,
	Project as ProjectModel,
} from "../models/project.js";
import {
	customerTemplate as Template,
	customerPath as Path,
} from "../routes/routes.js";
import Middleware from "./middleware.js";
import FrelanserReact from "../views/customer/dashboard/frelanser";
import RequestListReact from "../views/customer/dashboard/frelanser/request_list";
import RequestAddReact from "../views/customer/dashboard/frelanser/request_add";
import InvoiceListReact from "../views/customer/dashboard/frelanser/invoice_list";
import InvoiceDetailReact from "../views/customer/dashboard/frelanser/invoice_detail";
import InvoicePrintReact from "../views/customer/dashboard/frelanser/invoice_print";
import UserDetailReact from "../views/customer/dashboard/frelanser/user_detail";
import ProjectDetailReact from "../views/customer/dashboard/frelanser/project_detail";

export default function (infoApp) {
	// Middleware function to check for logged-in users
	return {
		Root_Get: [
			function (req, res) {
				const RenderReact = renderToString(<FrelanserReact name="frelanser" />);
				res.render(Template.Frelanser(), {
					reactApp: RenderReact,
					data: JSON.stringify({ name: "frelanser" }),
				});
			},
		],

		Requests_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				RequestModel.find({
					userId: userId,
				})
					.populate("projectId")
					.then(function (requests) {
						const RenderReact = renderToString(
							<RequestListReact data={requests} />
						);
						res.render(Template.Frelanser() + "/request_list", {
							reactApp: RenderReact,
							data: JSON.stringify({ data: requests }),
						});
					})
					.catch(function (err) {
						console.log(err);
					});
			},
		],

		RequestAdd_Get: [
			async (req, res) => {
				const { id: userId = 0 } = infoApp.user;
				const { projectId } = req.params;
				const RenderReact = renderToString(
					<RequestAddReact data={{ userId: userId, projectId: projectId }} />
				);
				res.render(Template.Frelanser() + "/request_add", {
					reactApp: RenderReact,
					data: JSON.stringify({
						data: { userId: userId, projectId: projectId },
					}),
				});
			},
		],
		RequestAdd_Post: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const { projectId = 0 } = req.params;
				const { description, amount, duration, invoice } = req.body;

				const newRequest = new RequestModel({
					userId: userId,
					projectId: projectId,
					description: description,
					amount: amount,
					duration: duration,
					invoice: JSON.parse(invoice),
				});
				newRequest
					.save(newRequest)
					.then((request) => {
						// REDIRECT TO THE project
						res.redirect(Path.Frelanser() + "/requests");
					})
					.catch((err) => {
						res.render(Template.Frelanser() + "/request_add", {
							message: "failed set to db",
						});
					});
			},
		],

		RequestEdit_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				const requestId = req.params.requestId;
				RequestModel.findOne(
					{
						_id: requestId,
						userId: userId,
					},
					function (err, request) {
						if (err) console.error(err);
						const RenderReact = renderToString(
							<RequestAddReact data={request} isEdit={true} />
						);
						res.render(Template.Frelanser() + "/request_add", {
							reactApp: RenderReact,
							data: JSON.stringify({ data: request, isEdit: true }),
						});
					}
				);
			},
		],
		RequestEdit_Post: [
			function (req, res) {
				const requestId = req.params.requestId;
				const { id: userId = 0 } = infoApp.user;
				const { description, amount, duration, invoice } = req.body;
				RequestModel.findOne({
					_id: requestId,
				})
					.then(function (request) {
						request.description = description;
						request.duration = duration;
						request.amount = amount;
						request.invoice = JSON.parse(invoice);
						request.save();
					})
					.catch(function (err) {
						console.error(err);
					});

				// payId: payId,
				// request: request,
				// Progress: Progress,
				// date: date,
				// REDIRECT TO THE project
				res.redirect(Path.Frelanser() + "/requests");
			},
		],

		RequestDelete_Get: [
			function (req, res) {
				const requestId = req.params.requestId;
				RequestModel.findByIdAndDelete(requestId, function (err) {
					if (err) console.error(err);
					// REDIRECT TO THE project
					res.redirect(Path.Frelanser() + "/requests");
				});
			},
		],

		Invoices_Get: [
			function (req, res) {
				const { id: userId = 0 } = infoApp.user;
				InvoiceModel.find({
					frelancerId: userId,
				})
					.populate("projectId")
					.then(function (invoices) {
						const RenderReact = renderToString(
							<InvoiceListReact data={invoices} />
						);
						res.render(Template.Frelanser() + "/invoice_list", {
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
				let invoiceId = req.params.invoiceId;
				InvoiceModel.findOne({
					_id: invoiceId,
					frelancerId: userId,
				})
					.populate("projectId")
					.populate("requestId")
					.populate("employerId")
					.populate("frelancerId")
					.then(function (invoice) {
						const RenderReact = renderToString(
							<InvoiceDetailReact data={invoice} />
						);
						res.render(Template.Frelanser() + "/invoice_detail", {
							reactApp: RenderReact,
							data: JSON.stringify({ data: invoice }),
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
				let invoiceId = req.params.invoiceId;
				const RenderReact = renderToString(
					<InvoicePrintReact name="Frelanser" />
				);
				res.render(Template.Frelanser() + "/invoice_print", {
					reactApp: RenderReact,
					data: JSON.stringify({ name: "Frelanser" }),
				});
			},
		],

		Profile_Get: [
			function (req, res) {
				const RenderReact = renderToString(
					<UserDetailReact name="frelanser" />
				);
				res.render(Template.Frelanser() + "/user_detail", {
					reactApp: RenderReact,
					data: JSON.stringify({ name: "frelanser" }),
				});
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
							res.redirect(Path.Frelanser() + "/projects");
						}
						// Successful, so render.
						const RenderReact = renderToString(
							<ProjectDetailReact
								data={project}
								requests={requests}
								files={files}
							/>
						);
						res.render(Template.Frelanser() + "/project_detail", {
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
	};
}
