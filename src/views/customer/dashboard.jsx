import React from "react";

import * as dataDashboard from "../data/dashboard.js";
import FooterLayout from "./layouts/footer";
import BodyLayout from "./layouts/body";
//import MainSidebarLayout from "./layouts/mainSidebar";
import NavbarLayout from "./layouts/navbar";
import BreadCrumbComponet from "./component/breadCrumb";
//import StatBoxComponet from "./component/StatBox";

export default(props) => {
	return (
		<BodyLayout class="layout-fixed layout-navbar-fixed sidebar-collapse">
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
					<div className="container-fluid">
						<div className="row">
							{/* Small boxes (Stat box) */}
							<div className="col-lg-12">admin</div>
						</div>
						{/* Main row */}
						<div className="row">
							{/* Left col */}
							<section className="col-lg-6">frelancer</section>
							{/* /.Left col */}
							{/* right col */}
							<section className="col-lg-6">employer</section>
							{/* right col */}
						</div>
						{/* /.row (main row) */}
					</div>
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
		</BodyLayout>
	);
}

