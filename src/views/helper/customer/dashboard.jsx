import React from "react";

import { hydrate } from "react-dom";

import DashboardReact from "../../customer/dashboard";

hydrate(<DashboardReact />, document.getElementsByTagName("html"));
