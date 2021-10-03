import bcrypt from "bcryptjs";
import { MUser } from "../models/user.js";
import { templateCustomer, pathCustomer } from "../config/routes.cjs";
import Mid from "./middleware.js";

export default function (infoApp) {
	// middleware function
	return {
		getRoot: function (req, res) {
			res.redirect(pathCustomer.Auth() + "/login");
		},

		getRegister: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Auth() + "/register", {
					name: "register",
				});
			},
		],

		postRegister: function (req, res) {
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
				res.render(templateCustomer.Auth() + "/register", {
					message: "Invalid credentials!",
				});
			} else {
				MUser.findOne({ "email.now": email })
					.then((user) => {
						if (user.email.now === email) {
							res.render(templateCustomer.Auth() + "/register", {
								message: "User Already Exists! Login or choose another user id",
							});
						}
					})
					.catch((err) => {
						res.render(templateCustomer.Auth() + "/register", {
							message: "not error",
						});
					});

				let newUser = new MUser({
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
						res.render(templateCustomer.Auth() + "/register", {
							message: "failed set to db",
						});
					});
			}
		},

		getLogIn: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Auth() + "/login", {
					redirect: req.query.redirect,
				});
			},
		],

		postLogIn: function (req, res) {
			const { email, password } = req.body;
			let redirect = req.query.redirect;
			if (!email || !password) {
				res.render(templateCustomer.Auth() + "/login", {
					message: "Please enter both email and password",
				});
			} else {
				MUser.findOne({ "email.now": email })
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
						res.render(templateCustomer.Auth() + "/login", {
							message: "login err",
						});
					});
			}
		},

		// reset password
		getRecover: [
			// Mid(infoApp).tokenChecker,
			function (req, res) {
				res.render(templateCustomer.Auth() + "/recover-password", {
					name: "recover-password",
				});
			},
		],

		postRecover: function (req, res) {
			const { email, password } = req.body;
		},

		getForgot: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Auth() + "/forgot-password", {
					name: "forgot-password",
				});
			},
		],

		postForgot: function (req, res) {
			const { email, password } = req.body;
		},

		getLogOut: function (req, res) {
			console.log("user logged out.");
			infoApp.session.user = undefined;
			infoApp.session.login = true;
			res.redirect("/");
		},
	};
}
