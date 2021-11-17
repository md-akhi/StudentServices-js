import React from "react";

import { hydrate } from "react-dom";

import InvoiceDetailReact from "../../../../customer/dashboard/frelanser/invoice_detail";

hydrate(<InvoiceDetailReact />, document.getElementsByTagName("html"));
