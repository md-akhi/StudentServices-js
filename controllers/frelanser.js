//import { User as ModelUser } from "../models/user.js";
//import Frelanser from "../models/frelanser.js";
//import { * as Model } from "../models/project.js";
import {
	Request as ModelRequest,
	Invoice as ModelInvoice,
} from "../models/project.js";
import {
	templateCustomer as Template,
	pathCustomer as Path,
} from "../config/routes.cjs";
import Middleware from "./middleware.js";

export default function (infoApp) {
	// Middleware function to check for logged-in users
	return {
		Root_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				res.render(Template.Frelanser(), {
					name: "frelanser",
				});
			},
		],

		Requests_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				ModelRequest.find({
					userId: userId,
				})
					.populate("projectId")
					.then(function (requests) {
						console.log(requests);
						res.render(Template.Frelanser() + "/request_list", {
							data: requests,
						});
					})
					.catch(function (err) {});
			},
		],

		RequestAdd_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let projectId = req.params.projectId;
				res.render(Template.Frelanser() + "/request_add", {
					user: userId,
					project: projectId,
				});
			},
		],
		RequestAdd_Post: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				//let userId = infoApp.session.user.id;
				//let projectId = req.params.projectId;
				const { description, amount, duration, projectId, userId } = req.body;

				let newRequest = new ModelRequest({
					userId: userId,
					projectId: projectId,
					description: description,
					amount: amount,
					duration: duration,
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
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let requestId = req.params.requestId;
				ModelRequest.findOne(
					{
						_id: requestId,
						userId: userId,
					},
					function (err, request) {
						if (!request) res.redirect(Path.Frelanser() + "/requests");
						res.render(Template.Frelanser() + "/request_add", {
							data: request,
							isEdit: true,
						});
					}
				);
			},
		],
		RequestEdit_Post: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				const { description, status, estimated, total, duration } = req.body;
				let requestId = req.params.requestId;
				ModelRequest.findById(requestId, function (err, edit) {
					if (err) console.log(err);
					edit.description = description;
					edit.status = status;
					edit.budget = estimated;
					edit.duration = duration;
					// payId: payId,
					// request: request,
					// Progress: Progress,
					// date: date,
					edit.save();
				});
				// REDIRECT TO THE project
				res.redirect(Path.Frelanser() + "/requests");
			},
		],

		RequestDelete_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let requestId = req.params.requestId;
				ModelRequest.findByIdAndDelete(requestId, function (err) {
					if (err) console.log(err);
					// REDIRECT TO THE project
					res.redirect(Path.Frelanser() + "/requests");
				});
			},
		],

		Invoices_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				ModelInvoice.find({
					frelancerId: userId,
				})
					.populate("projectId")
					.then(function (invoices) {
						res.render(Template.Frelanser() + "/invoice_list", {
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
					frelancerId: userId,
				})
					.populate("projectId")
					.populate("requestId")
					.populate("employerId")
					.populate("frelancerId")
					.then(function (invoice) {
						res.render(Template.Frelanser() + "/invoice_detail", {
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
			function (req, res) {},
		],

		InvoicePrint_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let invoiceId = req.params.invoiceId;
				res.render(Template.Frelanser() + "/invoice_print", {
					name: "employer",
				});
			},
		],

		Profile_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				res.render(Template.Frelanser() + "/user_detail", {
					name: "frelanser",
				});
			},
		],
	};
}
