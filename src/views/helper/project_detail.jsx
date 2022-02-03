import React from "react";

import { hydrate } from "react-dom";

import ProjectDetailReact from "../project_detail";

hydrate(
	<ProjectDetailReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
