const { MUser } = require("../models/user");
var bcrypt = require("bcryptjs");
const { template, path } = require("../config/routes");

module.exports = function (infoApp) {
	// middleware function
	let Mid = require("./middleware")(infoApp);
	return {
		getRoot: function (req, res) {
			res.redirect(path.CAuth() + "/login");
		},

		getRegister: [
			Mid.logInChecker,
			function (req, res) {
				res.render(template.CAuth() + "/register", {
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
				res.render(template.CAuth() + "/register", {
					message: "Invalid credentials!",
				});
			} else {
				MUser.findOne({ "email.now": email })
					.then((user) => {
						if (user.email.now === email) {
							res.render(template.CAuth() + "/register", {
								message: "User Already Exists! Login or choose another user id",
							});
						}
					})
					.catch((err) => {
						res.render(template.CAuth() + "/register", {
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
						res.redirect(path.CDashboard());
					})
					.catch((err) => {
						res.render(template.CAuth() + "/register", {
							message: "failed set to db",
						});
					});
			}
		},

		getLogIn: [
			Mid.logInChecker,
			function (req, res) {
				res.render(template.CAuth() + "/login", {
					redirect: req.query.redirect,
				});
			},
		],

		postLogIn: function (req, res) {
			const { email, password } = req.body;
			let redirect = req.query.redirect;
			if (!email || !password) {
				res.render(template.CAuth() + "/login", {
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
							res.redirect(path.CDashboard());
						}
					})
					.catch((err) => {
						res.render(template.CAuth() + "/login", {
							message: "login err",
						});
					});
			}
		},

		// reset password
		getRecover: [
			// Mid.tokenChecker,
			function (req, res) {
				res.render(template.CAuth() + "/recover-password", {
					name: "recover-password",
				});
			},
		],

		postRecover: function (req, res) {
			const { email, password } = req.body;
		},

		getForgot: [
			Mid.logInChecker,
			function (req, res) {
				res.render(template.CAuth() + "/forgot-password", {
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
};
