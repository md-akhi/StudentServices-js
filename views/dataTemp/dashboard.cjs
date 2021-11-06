import { customerPath } from "../../config/routes.cjs";

exports.linkNavUp = {
	Contact: "/Contact-us",
	Frelanser: customerPath.Frelanser(),
	Employer: customerPath.Employer(),
};

exports.breadCrumb = {
	Dashboard: customerPath.Dashboard(),
};
