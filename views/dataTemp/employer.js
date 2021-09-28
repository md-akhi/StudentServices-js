let { path } = require("../../config/routes");

let linkNavUp = {
	widget: "pushmenu",
	Home: "/",
	Contact: "/Contact-us",
	Frelanser: path.CFrelanser(),
};

let menuSidbarRight = {
	Project: {
		name: "project",
		sub: {
			List: path.CEmployer() + "/project",
			Add: path.CEmployer() + "/project/Add",
		},
	},
	Invoice: {
		name: "invoice",
		sub: {
			List: path.CEmployer() + "/invoice",
		},
	},
};

let breadCrumb = {
	Dashboard: path.CDashboard(),
	Employer: path.CEmployer(),
};

module.exports = {
	linkNavUp,
	menuSidbarRight,
	breadCrumb,
};
