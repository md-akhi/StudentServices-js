import React from "react";

import { hydrate } from "react-dom";

import DashboardReact from "../../customer/dashboard";

hydrate(
	<DashboardReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
