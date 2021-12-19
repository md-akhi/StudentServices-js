import React from "react";

function BodyLayout(props) {
	const { class: className = null, children = null } = props;
	return <body className={className}>{children}</body>;
}

export default BodyLayout;
