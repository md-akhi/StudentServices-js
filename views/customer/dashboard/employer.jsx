var React = require("react");
const FooterLayout = require("../layouts/footer");
const HtmlLayout = require("../layouts/html");
const MainSidebarLayout = require("../layouts/mainSidebar");
const NavbarLayout = require("../layouts/navbar");
const BreadCrumbComponet = require("../component/breadCrumb");
const StatBoxComponet = require("../component/StatBox");
//const SalesGraphOneComponet = require("../component/SalesGraph1");
//const SalesGraphTwoComponet = require("../component/SalesGraph2");
const CalendarComponet = require("../component/Calendar");
//const VisitorsComponet = require("../component/Visitors");
const ChatComponet = require("../component/Chat");
const ToDoComponet = require("../component/ToDo");
function frelanser(props) {
	return (
		<HtmlLayout class="hold-transition sidebar-mini layout-fixed">
			<NavbarLayout></NavbarLayout>
			<MainSidebarLayout></MainSidebarLayout>

			{/* Content Wrapper. Contains page content */}
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<BreadCrumbComponet></BreadCrumbComponet>
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
		</HtmlLayout>
	);
}

module.exports = frelanser;
