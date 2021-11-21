import React from "react";

import { hydrate } from "react-dom";

import LoginReact from "../../auth/login";

hydrate(<LoginReact />, document.getElementById("reactApp"));
