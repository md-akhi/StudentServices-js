module.exports = function (infoApp) {
	// middleware function
	const Mid = require("../controllers/middleware")(infoApp);
	// middleware function to check for logged-in users
	let dir = infoApp.direction;
	return {
		getRoot: function (req, res) {
			res.render("home", {
				name: "student Services",
				title: "Student Services",
			});
		},

		getUsers: function (req, res) {
			res.render("users", {
				name: "student Services",
				title: "Student Services",
			});
		},

		getProjects: function (req, res) {
			res.render("projects", {
				name: "student Services",
				title: "Student Services",
			});
		},
	};
};
