import React from "react";

import { hydrate } from "react-dom";

import FrelanserReact from "../../../customer/dashboard/frelanser";

hydrate(<FrelanserReact {...window.__PRELOADED_STATE__}/>, document.getElementById("reactApp"));
