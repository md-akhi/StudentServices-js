import React from "react";
import { renderToString } from "react-dom/server";
import { customerTemplate as Template } from "../config/routes.js";
import Middleware from "../controllers/middleware.js";
import DashboardReact from "../views/customer/dashboard";

export default function (infoApp) {
	// middleware function to check for logged-in users
	return {
		Root_Get: [
			function (req, res) {
				const RenderReact = renderToString(<DashboardReact name="dashboard" />);
				res.render(Template.Dashboard(), {
					reactApp: RenderReact,
				});
			},
		],
	};
}
