import React from "react";

import { hydrate } from "react-dom";

import ProjectAddReact from "../../../../customer/dashboard/employer/project_add";

hydrate(
	<ProjectAddReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
