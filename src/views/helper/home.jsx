import React from "react";

import { hydrate } from "react-dom";

import HomeReact from "../home";

hydrate(<HomeReact />, document.getElementById("reactApp"));
