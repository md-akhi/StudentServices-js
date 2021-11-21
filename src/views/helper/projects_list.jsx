import React from "react";

import { hydrate } from "react-dom";

import ProjectsListReact from "../projects_list";

hydrate(<ProjectsListReact />, document.getElementById("reactApp"));
