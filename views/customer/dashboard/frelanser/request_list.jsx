import React from "react";

import * as dataFrelanser from "../../../dataTemp/frelanser.cjs";
import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import HtmlLayout from "../../layouts/html";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

function requests(props) {
	return (
		<HtmlLayout class="hold-transition sidebar-mini layout-fixed">
			<NavbarLayout NavbarLinks={dataFrelanser.linkNavUp}></NavbarLayout>
			<MainSidebarLayout
				Data={dataFrelanser.menuSidbarRight}
			></MainSidebarLayout>

			{/* Content Wrapper. Contains page content */}
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<BreadCrumbComponet
					Data={dataFrelanser.breadCrumb}
					Name={"Requests"}
					Active={"Requests"}
				></BreadCrumbComponet>
				{/* /.content-header */}

				{/* Main content */}
				<section className="content">
					<div className="container-fluid">
						{/* Default box */}
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">requests</h3>

								<div className="card-tools">
									<button
										type="button"
										className="btn btn-tool"
										data-card-widget="collapse"
										title="Collapse"
									>
										<i className="fas fa-minus"></i>
									</button>
									<button
										type="button"
										className="btn btn-tool"
										data-card-widget="remove"
										title="Remove"
									>
										<i className="fas fa-times"></i>
									</button>
								</div>
							</div>
							<div className="card-body p-0">
								<table className="table table-striped projects">
									<thead>
										<tr>
											<th style={{ width: "1%" }}>#</th>
											<th style={{ width: "20%" }}>Project Name</th>
											<th style={{ width: "9%" }} className="text-center">
												Status
											</th>
											<th style={{ width: "60%" }}></th>
										</tr>
									</thead>
									<tbody>
										<RequestsItem data={props.data}></RequestsItem>
									</tbody>
								</table>
							</div>
							{/* /.card-body */}
						</div>
						{/* /.card */}
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

function RequestsItem(props) {
	return props.data.map((key, value) => {
		let project = key.projectId;
		let str = (
			<tr>
				<td>#{value + 1}</td>
				<td>
					{project.name}
					<br />
					<small>Created {new Date(key.createdAt).toDateString()}</small>
				</td>
				<td className="project-state">
					<span className="badge badge-success">Success {key.status}</span>
				</td>
				<td className="project-actions text-right">
					<a
						className="btn btn-primary btn-sm"
						href={"/project/" + project._id}
					>
						<i className="fas fa-folder"></i>
						View project
					</a>
					<a
						className="btn btn-info btn-sm"
						href={"./request/" + key._id + "/edit"}
					>
						<i className="fas fa-pencil-alt"></i>
						Edit
					</a>
					<a
						className="btn btn-danger btn-sm"
						href={"./request/" + key._id + "/del"}
					>
						<i className="fas fa-trash"></i>
						Delete
					</a>
				</td>
			</tr>
		);
		return str;
	});
}
export default requests;
