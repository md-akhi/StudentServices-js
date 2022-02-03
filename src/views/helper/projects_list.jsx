import React from "react";

import { hydrate } from "react-dom";

import ProjectsListReact from "../projects_list";

hydrate(
	<ProjectsListReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
