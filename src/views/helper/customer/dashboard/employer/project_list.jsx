import React from "react";

import { hydrate } from "react-dom";

import ProjectListReact from "../../../../customer/dashboard/employer/project_list";

hydrate(
	<ProjectListReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
