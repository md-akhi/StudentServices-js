import React from "react";

import { hydrate } from "react-dom";

import RequestListReact from "../../../../customer/dashboard/frelanser/request_list";

hydrate(<RequestListReact />, document.getElementById("reactApp"));
