import { pathCustomer } from "../../config/routes.cjs";

exports.linkNavUp = {
	widget: "pushmenu",
	Home: "/",
	Contact: "/Contact-us",
	Frelanser: pathCustomer.Frelanser(),
};

exports.menuSidbarRight = {
	Project: {
		name: "project",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: pathCustomer.Employer() + "/projects",
			Add: pathCustomer.Employer() + "/project/add",
		},
	},
	Invoice: {
		name: "invoice",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: pathCustomer.Employer() + "/invoice",
		},
	},
};

exports.breadCrumb = {
	Dashboard: pathCustomer.Dashboard(),
	Employer: pathCustomer.Employer(),
};
