import { customerTemplate as Template } from "../config/routes.cjs";
import Middleware from "../controllers/middleware.js";

export default function (infoApp) {
	// middleware function to check for logged-in users
	return {
		Root_Get: [
			function (req, res) {
				res.render(Template.Dashboard(), { name: "dashboard" });
			},
		],
	};
}
