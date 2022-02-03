import React from "react";

import { hydrate } from "react-dom";

import RecoverPasswordReact from "../../auth/recover-password";

hydrate(<RecoverPasswordReact {...window.__PRELOADED_STATE__}/>, document.getElementById("reactApp"));
