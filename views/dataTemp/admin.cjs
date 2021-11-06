import { customerPath } from "../../config/routes.cjs";

let menuNavUP = {
	Home: "/",
	Frelanser: customerPath.Frelanser(),
	Employer: customerPath.Employer(),
};

export { menuNavUP };
