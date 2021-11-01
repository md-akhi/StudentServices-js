import bcrypt from "bcryptjs";
import { User as ModelUser } from "../models/user.js";
import {
	templateHome as Template,
	pathHome as Path,
	pathCustomer,
} from "../config/routes.cjs";
import Middleware from "./middleware.js";

export default function (infoApp) {
	// middleware function
	return {
		Root_Get: function (req, res) {
			res.redirect(Path.Auth() + "/login");
		},

		Register_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				res.render(Template.Auth() + "/register", {
					name: "register",
				});
			},
		],
		Register_Post: function (req, res) {
			// check('fullname', "نام اجباری است")
			// check('email', "ایمیل اجباری است", 'ایمیل وجود دارد');
			// check('password', " رمز عبوراجباری است", 'پسوردها یکسان نیستند');
			// check("email", "ایمیل نامعتبر است").isEmail()
			const {
				firstname,
				lastname,
				email,
				password,
				retypePassword,
				terms,
			} = req.body;
			if (!req.body.email || !req.body.password) {
				res.render(Template.Auth() + "/register", {
					message: "Invalid credentials!",
				});
			} else {
				ModelUser.findOne({ "email.now": email })
					.then((user) => {
						if (user.email.now === email) {
							res.render(Template.Auth() + "/register", {
								message: "User Already Exists! Login or choose another user id",
							});
						}
					})
					.catch((err) => {
						res.render(Template.Auth() + "/register", {
							message: "not error",
						});
					});

				let newUser = new ModelUser({
					name: { first: firstname, last: lastname },
					email: { now: email },
					password: { now: password },
				});
				newUser
					.save(newUser)
					.then((user) => {
						// REDIRECT TO THE dashboard
						infoApp.session.user = user;
						infoApp.session.login = true;
						res.redirect(pathCustomer.Dashboard());
					})
					.catch((err) => {
						res.render(Template.Auth() + "/register", {
							message: "failed set to db",
						});
					});
			}
		},

		LogIn_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				res.render(Template.Auth() + "/login", {
					redirect: req.query.redirect,
				});
			},
		],
		LogIn_Post: function (req, res) {
			const { email, password } = req.body;
			let redirect = req.query.redirect;
			if (!email || !password) {
				res.render(Template.Auth() + "/login", {
					message: "Please enter both email and password",
				});
			} else {
				ModelUser.findOne({ "email.now": email })
					.then((user) => {
						if (user.password.now === password) {
							// REDIRECT TO THE dashboard
							infoApp.session.user = user;
							infoApp.session.login = true;
							if (redirect) res.redirect(redirect);
							res.redirect(pathCustomer.Dashboard());
						}
					})
					.catch((err) => {
						res.render(Template.Auth() + "/login", {
							message: "login err",
						});
					});
			}
		},

		// reset password
		Recover_Get: [
			// Middleware(infoApp).tokenChecker,
			function (req, res) {
				res.render(Template.Auth() + "/recover-password", {
					name: "recover-password",
				});
			},
		],
		Recover_Post: function (req, res) {
			const { email, password } = req.body;
		},

		Forgot_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				res.render(Template.Auth() + "/forgot-password", {
					name: "forgot-password",
				});
			},
		],
		Forgot_Post: function (req, res) {
			const { email, password } = req.body;
		},

		LogOut_Get: function (req, res) {
			console.log("user logged out.");
			infoApp.session.user = undefined;
			infoApp.session.login = true;
			res.redirect("/");
		},
	};
}
