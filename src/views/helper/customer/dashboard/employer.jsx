import React from "react";

import { hydrate } from "react-dom";

import EmployerReact from "../../../customer/dashboard/employer";

hydrate(<EmployerReact />, document.getElementsByTagName("html"));
