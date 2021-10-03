import { pathCustomer } from "../../config/routes.cjs";

let menuNavUP = {
	Home: "/",
	Frelanser: pathCustomer.Frelanser(),
	Employer: pathCustomer.Employer(),
};

export { menuNavUP };
