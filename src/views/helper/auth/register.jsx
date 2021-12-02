import React from "react";

import { hydrate } from "react-dom";

import RegisterReact from "../../auth/register";

hydrate(<RegisterReact {...window.__PRELOADED_STATE__}/>, document.getElementById("reactApp"));
