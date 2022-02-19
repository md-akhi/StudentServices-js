import React from "react";

export default(props)=> {
	return (
		<ul className="navbar-nav">
			<MenuNav Data={props.Data} />
		</ul>
	);
}

function MenuNav(props) {
	let listItems = [],
		sum = 0;
	Object.entries(props.Data).forEach(([key, value]) => {
		if (key == "widget") {
			if (value == "pushmenu")
				listItems[sum++] = (
					<li className="nav-item">
						<a className="nav-link" data-widget={value} href="#" role="button">
							<i className="fas fa-bars"></i>
						</a>
					</li>
				);
		} else
			listItems[sum++] = (
				<li className="nav-item d-none d-sm-inline-block">
					<a href={value} className="nav-link">
						{key}
					</a>
				</li>
			);
	});
	return listItems;
}

