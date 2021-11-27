import React from "react";
import { hydrate } from "react-dom";
import RequestAddReact from "../../../../customer/dashboard/frelanser/request_add";

hydrate(
	<RequestAddReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
