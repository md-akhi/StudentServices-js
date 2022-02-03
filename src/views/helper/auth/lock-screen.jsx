import React from "react";

import { hydrate } from "react-dom";

import LockScreenReact from "../../auth/lock-screen";

hydrate(<LockScreenReact {...window.__PRELOADED_STATE__}/>, document.getElementById("reactApp"));
