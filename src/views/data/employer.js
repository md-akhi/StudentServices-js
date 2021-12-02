import { customerPath } from "../../routes/routes.js";

const linkNavUp = {
	widget: "pushmenu",
	Home: "/",
	Contact: "/Contact-us",
	Frelanser: customerPath.Frelanser(),
};

const menuSidbarRight = {
	Project: {
		name: "projects",
		icon: "fas fa-tachometer-alt",
		sub: {
			Add: customerPath.Employer() + "/project/add",
			List: customerPath.Employer() + "/projects",
			Archived: customerPath.Employer() + "/projects/Archived",
		},
	},
	Invoice: {
		name: "invoices",
		icon: "fas fa-tachometer-alt",
		sub: {
			List: customerPath.Employer() + "/invoices",
			Archived: customerPath.Employer() + "/invoices/Archived",
		},
	},
};

const breadCrumb = {
	Dashboard: customerPath.Dashboard(),
	Employer: customerPath.Employer(),
};

export { linkNavUp, menuSidbarRight, breadCrumb };
