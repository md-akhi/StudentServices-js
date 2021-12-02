import React from "react";

import { hydrate } from "react-dom";

import HomeReact from "../home";

hydrate(
	<HomeReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
