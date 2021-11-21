import React from "react";

import { hydrate } from "react-dom";

import ProjectDetailReact from "../project_detail";

hydrate(<ProjectDetailReact />, document.getElementById("reactApp"));
