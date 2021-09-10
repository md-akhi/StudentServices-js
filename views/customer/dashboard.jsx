var React = require("react");

const FooterLayout = require("./layouts/footer");
const HtmlLayout = require("./layouts/html");
//const MainSidebarLayout = require("./layouts/mainSidebar");
const NavbarLayout = require("./layouts/navbar");
const BreadCrumbComponet = require("./component/breadCrumb");
const StatBoxComponet = require("./component/StatBox");
function dashborad(props) {
	return (
		<HtmlLayout class="layout-fixed layout-navbar-fixed sidebar-collapse">
			<NavbarLayout></NavbarLayout>
			{/* <MainSidebarLayout></MainSidebarLayout> */}

			{/* Content Wrapper. Contains page content */}
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<BreadCrumbComponet></BreadCrumbComponet>
				{/* /.content-header */}

				{/* Main content */}
				<section className="content">
					<div className="container-fluid">{/* /.row (main row) */}</div>
					{/* /.container-fluid */}
				</section>
				{/* /.content */}
			</div>
			{/* /.content-wrapper */}
			<FooterLayout></FooterLayout>

			{/* Control Sidebar */}
			<aside className="control-sidebar control-sidebar-dark">
				{/* Control sidebar content goes here */}
			</aside>
			{/* /.control-sidebar */}
			{/* ./wrapper */}
		</HtmlLayout>
	);
}

module.exports = dashborad;
