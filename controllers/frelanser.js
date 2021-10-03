//import { User } from "../models/user.js";
//import Frelanser from "../models/frelanser.js";
import { templateCustomer } from "../config/routes.cjs";
import Mid from "../controllers/Middleware.js";

export default function (infoApp) {
	// Middleware function to check for logged-in users
	return {
		getRoot: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Frelanser(), {
					name: "frelanser",
				});
			},
		],

		getAddRequest: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Frelanser(), {
					name: "frelanser",
				});
			},
		],
		postAddRequest: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Frelanser(), {
					name: "frelddanser",
				});
			},
		],

		getEditRequest: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Frelanser(), {
					name: "frelanser",
				});
			},
		],
		postEditRequest: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Frelanser(), {
					name: "frelanser",
				});
			},
		],

		getDelRequest: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Frelanser(), {
					name: "frelanser",
				});
			},
		],
		postDelRequest: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Frelanser(), {
					name: "frelanser",
				});
			},
		],

		getProfile: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Frelanser() + "/profile", {
					name: "frelanser",
				});
			},
		],
	};
}
