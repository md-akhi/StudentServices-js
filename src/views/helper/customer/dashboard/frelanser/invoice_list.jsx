import React from "react";

import { hydrate } from "react-dom";

import InvoiceListReact from "../../../../customer/dashboard/frelanser/invoice_list";

hydrate(
	<InvoiceListReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
