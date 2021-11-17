import { customerPath } from "../../config/routes.js";

exports.er400 = {
	Home: "/",
	Frelanser: customerPath.Frelanser(),
	Employer: customerPath.Employer(),
};

exports.er500 = {
	Home: "/",
	Frelanser: customerPath.Frelanser(),
	Employer: customerPath.Employer(),
};

export { er400, er500 };
