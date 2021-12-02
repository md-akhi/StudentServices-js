import { customerPath } from "../../routes/routes.js";

let menuNavUP = {
	Home: "/",
	Frelanser: customerPath.Frelanser(),
	Employer: customerPath.Employer(),
};

export { menuNavUP };
