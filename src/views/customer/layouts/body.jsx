import React from "react";

function BodyLayout(props) {
	return <body className={props.class}>{props.children}</body>;
}

export default BodyLayout;
