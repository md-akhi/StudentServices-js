import React from "react";

import { hydrate } from "react-dom";

import InvoicePrintReact from "../../../../customer/dashboard/frelanser/invoice_print";

hydrate(
	<InvoicePrintReact {...window.__PRELOADED_STATE__} />,
	document.getElementById("reactApp")
);
