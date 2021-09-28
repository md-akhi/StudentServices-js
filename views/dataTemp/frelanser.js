let { path } = require("../../config/routes");

let linkNavUp = {
	widget: "pushmenu",
	Home: "/",
	Contact: "/Contact-us",
	Employer: path.CEmployer(),
};

let menuSidbarRight = {
	Project: {
		name: "project",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: path.CFrelanser() + "/project",
			Add: path.CFrelanser() + "/project/Add",
		},
	},
	Invoice: {
		name: "invoice",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: path.CFrelanser() + "/invoice",
		},
	},
};

let breadCrumb = {
	Dashboard: path.CDashboard(),
	Frelanser: path.CFrelanser(),
};

module.exports = {
	linkNavUp,
	menuSidbarRight,
	breadCrumb,
};
