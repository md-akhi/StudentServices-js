import React from "react";

import * as dataFrelanser from "../../../data/frelanser.js";
import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import BodyLayout from "../../layouts/body";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

export default function (props) {
	const { data = null } = props;
	return (
		<BodyLayout class="hold-transition sidebar-mini layout-fixed">
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
										<RequestsItem data={data}></RequestsItem>
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
		</BodyLayout>
	);
}

function RequestsItem(props) {
	const { data = null } = props;
	return data.map((value, index) => {
		const {
			createdAt = null,
			status = null,
			projectId = null,
			_id: RId = null,
		} = value;
		const { name = null, _id: PId = null } = projectId;
		let str = (
			<tr>
				<td>#{index + 1}</td>
				<td>
					{name}
					<br />
					<small>Created {new Date(createdAt).toDateString()}</small>
				</td>
				<td className="project-state">
					<span className="badge badge-success">Success {status}</span>
				</td>
				<td className="project-actions text-right">
					<a
						className="btn btn-primary btn-sm"
						href={"./project/" + PId + "/detail"}
					>
						<i className="fas fa-folder"></i>
						View project
					</a>
					<a
						className="btn btn-info btn-sm"
						href={"./request/" + RId + "/edit"}
					>
						<i className="fas fa-pencil-alt"></i>
						Edit
					</a>
					<a
						className="btn btn-danger btn-sm"
						href={"./request/" + RId + "/del"}
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
