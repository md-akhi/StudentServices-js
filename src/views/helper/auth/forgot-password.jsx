import React from "react";

import { hydrate } from "react-dom";

import ForgotPasswordReact from "../../auth/forgot-password";

hydrate(<ForgotPasswordReact />, document.getElementById("reactApp"));
