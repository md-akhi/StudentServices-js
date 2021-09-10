var React = require("react");
let { menuNavUP } = require("../../../config/varStatic");

function NavbarLinksComponet(props) {
	return (
		<ul className="navbar-nav">
			<li className="nav-item">
				<a className="nav-link" data-widget="pushmenu" href="#" role="button">
					<i className="fas fa-bars"></i>
				</a>
			</li>
			<MenuNav link={menuNavUP} />
		</ul>
	);
}

function MenuNav(props) {
	let listItems = [],
		sum = 0;
	Object.entries(props.link).forEach(
		([key, value]) =>
			(listItems[sum++] = (
				<li className="nav-item d-none d-sm-inline-block">
					<a href={value} className="nav-link">
						{key}
					</a>
				</li>
			))
	);
	return listItems;
}

module.exports = NavbarLinksComponet;
