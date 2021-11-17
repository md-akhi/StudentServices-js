import { customerPath as path } from "../../config/routes.js";

const linkNavUp = {
	widget: "pushmenu",
	Home: "/",
	Contact: "/ContactUs",
	Employer: path.Employer(),
};

const menuSidbarRight = {
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

const breadCrumb = {
	Dashboard: path.Dashboard(),
	Frelanser: path.Frelanser(),
	Requests: path.Frelanser() + "/requests",
};

export { linkNavUp, menuSidbarRight, breadCrumb };
