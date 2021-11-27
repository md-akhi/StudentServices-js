import React from "react";
import { renderToString } from "react-dom/server";
//import { User as UserModel } from "../models/user.js";
//import Frelanser from "../models/frelanser.js";
//import { * as Model } from "../models/project.js";
import {
	Request as RequestModel,
	Invoice as InvoiceModel,
} from "../models/project.js";
import {
	customerTemplate as Template,
	customerPath as Path,
} from "../config/routes.js";
import Middleware from "./middleware.js";
import FrelanserReact from "../views/customer/dashboard/frelanser";
import RequestListReact from "../views/customer/dashboard/frelanser/request_list";
import RequestAddReact from "../views/customer/dashboard/frelanser/request_add";
import InvoiceListReact from "../views/customer/dashboard/frelanser/invoice_list";
import InvoiceDetailReact from "../views/customer/dashboard/frelanser/invoice_detail";
import InvoicePrintReact from "../views/customer/dashboard/frelanser/invoice_print";
import UserDetailReact from "../views/customer/dashboard/frelanser/user_detail";

export default function (infoApp) {
	// Middleware function to check for logged-in users
	return {
		Root_Get: [
			function (req, res) {
				const RenderReact = renderToString(<FrelanserReact name="frelanser" />);
				res.render(Template.Frelanser(), {
					reactApp: RenderReact,
				});
			},
		],

		Requests_Get: [
			function (req, res) {
				const userId = infoApp.user.id;
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
						});
					})
					.catch(function (err) {});
			},
		],

		RequestAdd_Get: [
			async (req, res) => {
				const userId = infoApp.user.id;
				const projectId = req.params.projectId;
				const RenderReact = renderToString(
					<RequestAddReact user={userId} project={projectId} />
				);
				res.render(Template.Frelanser() + "/request_add", {
					reactApp: RenderReact,
					data: JSON.stringify({ user: userId, project: projectId }),
				});
			},
		],
		RequestAdd_Post: [
			function (req, res) {
				const userId = infoApp.user.id;
				const projectId = req.params.projectId;
				const { description, amount, duration, invoice } = req.body;

				let newRequest = new RequestModel({
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
				const userId = infoApp.user.id;
				const requestId = req.params.requestId;
				RequestModel.findOne(
					{
						_id: requestId,
						userId: userId,
					},
					function (err, request) {
						if (err) console.log(err);
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
				const userId = infoApp.user.id;
				const { description, amount, duration, invoice } = req.body;
				const filter = {
					_id: requestId,
					userId: userId,
				};
				const update = {
					description: description,
					duration: duration,
					amount: amount,
					invoice: JSON.parse(invoice),
				};
				RequestModel.findOneAndUpdate(filter, update);
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
					if (err) console.log(err);
					// REDIRECT TO THE project
					res.redirect(Path.Frelanser() + "/requests");
				});
			},
		],

		Invoices_Get: [
			function (req, res) {
				const userId = infoApp.user.id;
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
						});
					})
					.catch(function (err) {
						if (err) console.log(err);
					});
			},
		],

		InvoiceDetail_Get: [
			function (req, res) {
				const userId = infoApp.user.id;
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
						});
					})
					.catch(function (err) {
						if (err) console.log(err);
					});
			},
		],

		InvoicePrint_Get: [
			function (req, res) {
				const userId = infoApp.user.id;
				let invoiceId = req.params.invoiceId;
				const RenderReact = renderToString(
					<InvoicePrintReact name="employer" />
				);
				res.render(Template.Frelanser() + "/invoice_print", {
					reactApp: RenderReact,
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
				});
			},
		],
	};
}
