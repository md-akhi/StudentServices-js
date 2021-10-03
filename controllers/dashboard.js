import { templateCustomer } from "../config/routes.cjs";
import Mid from "../controllers/middleware.js";

export default function (infoApp) {
	// middleware function to check for logged-in users
	return {
		getRoot: [
			Mid(infoApp).logInChecker,
			function (req, res) {
				res.render(templateCustomer.Dashboard(), { name: "dashboard" });
			},
		],
	};
}
