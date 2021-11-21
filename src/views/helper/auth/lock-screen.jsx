import React from "react";

import { hydrate } from "react-dom";

import LockScreenReact from "../../auth/lock-screen";

hydrate(<LockScreenReact />, document.getElementById("reactApp"));
