import React from "react";

import { hydrate } from "react-dom";

import RequestAddReact from "../../../../customer/dashboard/frelanser/request_add";

hydrate(<RequestAddReact />, document.getElementById("reactApp"));
