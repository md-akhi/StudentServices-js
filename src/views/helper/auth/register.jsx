import React from "react";

import { hydrate } from "react-dom";

import RegisterReact from "../../auth/register";

hydrate(<RegisterReact />, document.getElementById("reactApp"));
