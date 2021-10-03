import React from "react";
const CssLayout = require("./css");
const JsLayout = require("./js");
const MetaLayout = require("./meta");

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
