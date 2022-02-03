import React from "react";

import { hydrate } from "react-dom";

import InvoiceDetailReact from "../../../../customer/dashboard/employer/invoice_detail";

hydrate(<InvoiceDetailReact {...window.__PRELOADED_STATE__}/>, document.getElementById("reactApp"));
