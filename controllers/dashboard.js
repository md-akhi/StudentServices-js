import { templateCustomer as Template } from "../config/routes.cjs";
import Middleware from "../controllers/middleware.js";

export default function (infoApp) {
	// middleware function to check for logged-in users
	return {
		Root_Get: [
			Middleware(infoApp).LogInChecker,
			function (req, res) {
				res.render(Template.Dashboard(), { name: "dashboard" });
			},
		],
	};
}
