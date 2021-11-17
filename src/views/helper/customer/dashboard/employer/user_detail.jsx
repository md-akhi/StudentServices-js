import React from "react";

import { hydrate } from "react-dom";

import UserDetailReact from "../../../../customer/dashboard/employer/user_detail";

hydrate(<UserDetailReact />, document.getElementsByTagName("html"));
