import React from "react";

import { hydrate } from "react-dom";

import UsersListReact from "../users_list";

hydrate(
	<UsersListReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
