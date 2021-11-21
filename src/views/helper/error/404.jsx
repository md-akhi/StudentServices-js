import React from "react";

import { hydrate } from "react-dom";

import Error404React from "../../error/404";

hydrate(<Error404React />, document.getElementById("reactApp"));
