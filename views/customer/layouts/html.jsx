import React from "react";

import CssLayout from "./css";
import JsLayout from "./js";
import MetaLayout from "./meta";

function HtmlLayout(props) {
	return (
		<html>
			<head>
				<MetaLayout></MetaLayout>
				<title>{props.title}</title>
				<CssLayout></CssLayout>
			</head>
			<body className={props.class}>
				{props.children}
				<JsLayout></JsLayout>
			</body>
		</html>
	);
}

export default HtmlLayout;
