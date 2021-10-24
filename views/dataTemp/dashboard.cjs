import { pathCustomer } from "../../config/routes.cjs";

exports.linkNavUp = {
	Contact: "/Contact-us",
	Frelanser: pathCustomer.Frelanser(),
	Employer: pathCustomer.Employer(),
};

exports.breadCrumb = {
	Dashboard: pathCustomer.Dashboard(),
};
