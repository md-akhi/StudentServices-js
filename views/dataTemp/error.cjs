import { customerPath } from "../../config/routes.cjs";

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
