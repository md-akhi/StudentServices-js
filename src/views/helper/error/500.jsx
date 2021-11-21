import React from "react";

import { hydrate } from "react-dom";

import Error500React from "../../error/500";

hydrate(<Error500React />, document.getElementById("reactApp"));
