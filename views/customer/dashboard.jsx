import React from "react";

import dataDashboard from "../dataTemp/dashboard.cjs";
import FooterLayout from "./layouts/footer";
import HtmlLayout from "./layouts/html";
//import MainSidebarLayout from "./layouts/mainSidebar";
import NavbarLayout from "./layouts/navbar";
import BreadCrumbComponet from "./component/breadCrumb";
//import StatBoxComponet from "./component/StatBox";

function dashborad(props) {
	return (
		<HtmlLayout class="layout-fixed layout-navbar-fixed sidebar-collapse">
			<NavbarLayout NavbarLinks={dataDashboard.linkNavUp}></NavbarLayout>
			{/* <MainSidebarLayout></MainSidebarLayout> */}
			{/* Content Wrapper. Contains page content */}
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<BreadCrumbComponet
					Data={dataDashboard.breadCrumb}
					Name={"Dashboard"}
					Active={"Dashboard"}
				></BreadCrumbComponet>
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

export default dashborad;
