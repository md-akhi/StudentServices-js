import { pathCustomer } from "../../config/routes.cjs";

exports.linkNavUp = {
	widget: "pushmenu",
	Home: "/",
	Contact: "/Contact-us",
	Frelanser: pathCustomer.Frelanser(),
};

exports.menuSidbarRight = {
	Project: {
		name: "projects",
		icon: "fas fa-tachometer-alt",
		sub: {
			Add: pathCustomer.Employer() + "/project/add",
			List: pathCustomer.Employer() + "/projects",
			Archived: pathCustomer.Employer() + "/projects/Archived",
		},
	},
	Invoice: {
		name: "invoices",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: pathCustomer.Employer() + "/invoices",
			Archived: pathCustomer.Employer() + "/invoices/Archived",
		},
	},
};

exports.breadCrumb = {
	Dashboard: pathCustomer.Dashboard(),
	Employer: pathCustomer.Employer(),
};
