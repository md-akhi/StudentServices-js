import { pathCustomer as path } from "../../config/routes.cjs";

exports.linkNavUp = {
	widget: "pushmenu",
	Home: "/",
	Contact: "/Contact-us",
	Employer: path.Employer(),
};

exports.menuSidbarRight = {
	Project: {
		name: "request",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: path.Frelanser() + "/requests",
			Add: path.Frelanser() + "/request/add",
		},
	},
	Invoice: {
		name: "invoice",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: path.Frelanser() + "/invoice",
		},
	},
};

exports.breadCrumb = {
	Dashboard: path.Dashboard(),
	Frelanser: path.Frelanser(),
	Requests: path.Frelanser() + "/requests",
};
