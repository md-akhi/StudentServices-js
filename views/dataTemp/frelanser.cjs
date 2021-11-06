import { customerPath as path } from "../../config/routes.cjs";

exports.linkNavUp = {
	widget: "pushmenu",
	Home: "/",
	Contact: "/ContactUs",
	Employer: path.Employer(),
};

exports.menuSidbarRight = {
	Project: {
		name: "request",
		icon: "fas fa-tachometer-alt",
		sub: {
			Add: "/projects",
			List: path.Frelanser() + "/requests",
			Archived: path.Frelanser() + "/requests/Archived",
		},
	},
	Invoice: {
		name: "invoices",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: path.Frelanser() + "/invoices",
			Archived: path.Frelanser() + "/invoices/Archived",
		},
	},
};

exports.breadCrumb = {
	Dashboard: path.Dashboard(),
	Frelanser: path.Frelanser(),
	Requests: path.Frelanser() + "/requests",
};
