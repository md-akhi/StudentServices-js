import React from "react";

import { hydrate } from "react-dom";

import UsersListReact from "../users_list";

hydrate(<UsersListReact />, document.getElementById("reactApp"));
