import React from "react";

import { hydrate } from "react-dom";

import RequestListReact from "../../../../customer/dashboard/frelanser/request_list";

hydrate(
	<RequestListReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
