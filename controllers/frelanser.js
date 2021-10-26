//import { User as ModelUser } from "../models/user.js";
//import Frelanser from "../models/frelanser.js";
//import { * as Model } from "../models/project.js";
import { Request as ModelRequest } from "../models/project.js";
import {
	templateCustomer as Template,
	pathCustomer as Path,
} from "../config/routes.cjs";
import Middleware from "./middleware.js";

export default function (infoApp) {
	// Middleware function to check for logged-in users
	return {
		rootGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				res.render(Template.Frelanser(), {
					name: "frelanser",
				});
			},
		],

		requestsGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				ModelRequest.find(
					{
						userId: userId,
					},
					function (err, requests) {
						res.render(Template.Frelanser() + "/request_list", {
							data: requests,
						});
					}
				).populate("projectId");
			},
		],

		addRequestGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let projectId = req.params.id;
				res.render(Template.Frelanser() + "/request_add", {
					user: userId,
					project: projectId,
				});
			},
		],
		addRequestPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
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

		editRequestGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let userId = infoApp.session.user.id;
				let id = req.params.id;
				ModelRequest.findOne(
					{
						_id: id,
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
		editRequestPost: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				const { description, status, estimated, total, duration } = req.body;
				let id = req.params.id;
				ModelRequest.findById(id, function (err, edit) {
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

		delRequestGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				let id = req.params.id;
				ModelRequest.findByIdAndDelete(id, function (err) {
					if (err) console.log(err);
					// REDIRECT TO THE project
					res.redirect(Path.Frelanser() + "/requests");
				});
			},
		],

		profileGet: [
			Middleware(infoApp).logInChecker,
			function (req, res) {
				res.render(Template.Frelanser() + "/user_detail", {
					name: "frelanser",
				});
			},
		],
	};
}
