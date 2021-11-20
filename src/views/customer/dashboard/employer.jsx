import React from "react";

import * as dataEmployer from "../../data/employer.js";
import FooterLayout from "../layouts/footer";
import BodyLayout from "../layouts/body";
import MainSidebarLayout from "../layouts/mainSidebar";
import NavbarLayout from "../layouts/navbar";
import BreadCrumbComponet from "../component/breadCrumb";
import StatBoxComponet from "../component/StatBox";
//import SalesGraphOneComponet from "../component/SalesGraph1";
//import SalesGraphTwoComponet from "../component/SalesGraph2";
import CalendarComponet from "../component/Calendar";
//import VisitorsComponet from "../component/Visitors";
import ChatComponet from "../component/Chat";
import ToDoComponet from "../component/ToDo";

function frelanser(props) {
	return (
		<BodyLayout class="hold-transition sidebar-mini layout-fixed">
			<NavbarLayout NavbarLinks={dataEmployer.linkNavUp}></NavbarLayout>
			<MainSidebarLayout
				Data={dataEmployer.menuSidbarRight}
			></MainSidebarLayout>

			{/* Content Wrapper. Contains page content */}
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<BreadCrumbComponet
					Data={dataEmployer.breadCrumb}
					Name={"Employer"}
					Active={"Employer"}
				></BreadCrumbComponet>
				{/* /.content-header */}

				{/* Main content */}
				<section className="content">
					<div className="container-fluid">
						{/* Small boxes (Stat box) */}
						<StatBoxComponet></StatBoxComponet>
						{/* Main row */}
						<div className="row">
							{/* Left col */}
							<section className="col-lg-7 connectedSortable">
								{/* <SalesGraphOneComponet></SalesGraphOneComponet> */}
								<ChatComponet></ChatComponet>
								<ToDoComponet></ToDoComponet>
							</section>
							{/* /.Left col */}
							{/* right col (We are only adding the ID to make the widgets sortable)*/}
							<section className="col-lg-5 connectedSortable">
								{/* <VisitorsComponet></VisitorsComponet>
								<SalesGraphTwoComponet></SalesGraphTwoComponet> */}
								<CalendarComponet></CalendarComponet>
							</section>
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

export default frelanser;
