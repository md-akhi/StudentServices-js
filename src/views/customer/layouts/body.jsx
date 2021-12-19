import React from "react";

function BodyLayout(props) {
	return <span className={props.class}>{props.children}</span>;
}

export default BodyLayout;
