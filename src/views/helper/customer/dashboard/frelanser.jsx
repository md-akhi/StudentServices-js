import React from "react";

import { hydrate } from "react-dom";

import FrelanserReact from "../../../customer/dashboard/frelanser";

hydrate(<FrelanserReact />, document.getElementsByTagName("html"));
