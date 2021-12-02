import React from "react";

import { hydrate } from "react-dom";

import EmployerReact from "../../../customer/dashboard/employer";

hydrate(<EmployerReact {...window.__PRELOADED_STATE__}/>, document.getElementById("reactApp"));
