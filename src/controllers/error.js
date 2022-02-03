import React from "react";
import { renderToString } from "react-dom/server";
import { errorTemplate as Template } from "../routes/routes.js";
import Error404React from "../views/error/404";
import Error500React from "../views/error/500";

export default function (infoApp) {
	return {
		// catch undefined routes and respond with 404
		E404: (req, res, next) => {
			//res.status(404).send("Sorry can't find that! 400");
			const RenderReact = renderToString(<Error404React data={""} />);
			res.status(404).render(Template.Root() + "/404", {
				reactApp: RenderReact,
				data: JSON.stringify({}),
			});
		},

		// catch server errors and respond with 500
		E500: (err, req, res, next) => {
			console.error(err.stack);
			//res.status(500).send("Something broke! 5xx");
			const RenderReact = renderToString(<Error500React data={{ err: err }} />);
			res.status(500).render(Template.Root() + "/500", {
				reactApp: RenderReact,
				data: JSON.stringify({ err: err }),
			});
		},
	};
}
