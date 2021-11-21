import React from "react";

function BodyLayout(props) {
	return <div className={props.class}>{props.children}</div>;
}

export default BodyLayout;
