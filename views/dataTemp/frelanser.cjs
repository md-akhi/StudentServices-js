import { pathCustomer } from "../../config/routes.cjs";

exports.linkNavUp = {
	widget: "pushmenu",
	Home: "/",
	Contact: "/Contact-us",
	Employer: pathCustomer.Employer(),
};

exports.menuSidbarRight = {
	Project: {
		name: "project",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: pathCustomer.Frelanser() + "/project",
			Add: pathCustomer.Frelanser() + "/project/Add",
		},
	},
	Invoice: {
		name: "invoice",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: pathCustomer.Frelanser() + "/invoice",
		},
	},
};

exports.breadCrumb = {
	Dashboard: pathCustomer.Dashboard(),
	Frelanser: pathCustomer.Frelanser(),
};
