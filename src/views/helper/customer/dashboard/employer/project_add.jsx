import React from "react";

import { hydrate } from "react-dom";

import ProjectAddReact from "../../../../customer/dashboard/employer/project_add";

hydrate(<ProjectAddReact />, document.getElementById("reactApp"));
