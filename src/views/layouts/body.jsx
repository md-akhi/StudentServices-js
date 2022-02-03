import React from "react";

export default(props)=> {
	const { class: className = null, children = null } = props;
	return <body className={className}>{children}</body>;
}

