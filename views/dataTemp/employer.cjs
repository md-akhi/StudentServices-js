import { pathCustomer } from "../../config/routes.cjs";

let linkNavUp = {
	widget: "pushmenu",
	Home: "/",
	Contact: "/Contact-us",
	Frelanser: pathCustomer.Frelanser(),
};

let menuSidbarRight = {
	Project: {
		name: "project",
		sub: {
			List: pathCustomer.Employer() + "/project",
			Add: pathCustomer.Employer() + "/project/Add",
		},
	},
	Invoice: {
		name: "invoice",
		sub: {
			List: pathCustomer.Employer() + "/invoice",
		},
	},
};

let breadCrumb = {
	Dashboard: pathCustomer.Dashboard(),
	Employer: pathCustomer.Employer(),
};

export { linkNavUp, menuSidbarRight, breadCrumb };
