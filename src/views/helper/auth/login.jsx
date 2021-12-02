import React from "react";

import { hydrate } from "react-dom";

import LoginReact from "../../auth/login";

hydrate(<LoginReact {...window.__PRELOADED_STATE__}/>, document.getElementById("reactApp"));
