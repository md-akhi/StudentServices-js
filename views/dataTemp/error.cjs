import { pathCustomer } from "../../config/routes.cjs";

exports.er400 = {
	Home: "/",
	Frelanser: pathCustomer.Frelanser(),
	Employer: pathCustomer.Employer(),
};

exports.er500 = {
	Home: "/",
	Frelanser: pathCustomer.Frelanser(),
	Employer: pathCustomer.Employer(),
};
