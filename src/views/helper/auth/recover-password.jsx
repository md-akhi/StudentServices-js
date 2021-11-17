import React from "react";

import { hydrate } from "react-dom";

import RecoverPasswordReact from "../../auth/recover-password";

hydrate(<RecoverPasswordReact />, document.getElementsByTagName("html"));
