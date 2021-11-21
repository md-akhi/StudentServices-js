import React from "react";

import { hydrate } from "react-dom";

import InvoiceDetailReact from "../../../../customer/dashboard/employer/invoice_detail";

hydrate(<InvoiceDetailReact />, document.getElementById("reactApp"));
