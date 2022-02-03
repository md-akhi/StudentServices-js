import React from "react";

import * as dataFrelanser from "../../../data/frelanser.js";
import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import BodyLayout from "../../layouts/body";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

import AvatarImg from "../../../data/img/avatar.png";

function Invoices(props) {
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
					Name={"Frelanser"}
					Active={"Frelanser"}
				></BreadCrumbComponet>
				{/* /.content-header */}

				{/* Main content */}
				<section className="content">
					<div className="container-fluid">
						{/* Default box */}
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Invoices</h3>

							</div>
							<div className="card-body p-0">
								<table className="table table-striped projects">
									<thead>
										<tr>
											<th style={{ width: "1%" }}>#</th>
											<th style={{ width: "20%" }}>Project Name</th>
											<th style={{ width: "30%" }}>Team Members</th>
											<th>Project Progress</th>
											<th style={{ width: "8%" }} className="text-center">
												Status
											</th>
											<th style={{ width: "20%" }}></th>
										</tr>
									</thead>
									<tbody>
										<InvoicesItem data={data}></InvoicesItem>
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
function InvoicesItem(props) {
	const { data = null } = props;
	return data.map((value, index) => {
		const {
			projectId = null,
			_id: IId = null,
			request = null,
			frelancerId = null,
		} = value;
		const { name = null, createdAt = null, _id: PId = null } = projectId;
		let str = (
			<tr>
				<td>#{index + 1}</td>
				<td>
					<a>{name}</a>
					<br />
					<small>Created {new Date(createdAt).toDateString()}</small>
				</td>
				<td>
					<ul className="list-inline">
						<li className="list-inline-item">
							<a href="">
								{request}
								<img alt="Avatar" className="table-avatar" src={AvatarImg} />
							</a>
						</li>
					</ul>
				</td>
				<td className="project_progress">
					<div className="progress progress-sm">
						<div
							className="progress-bar bg-green"
							role="progressbar"
							aria-valuenow="57"
							aria-valuemin="0"
							aria-valuemax="100"
							style={{ width: "57%" }}
						></div>
					</div>
					<small>57% Complete</small>
				</td>
				<td className="project-state">
					<span className="badge badge-success">Success</span>
				</td>
				<td className="project-actions text-right">
					{frelancerId ? (
						<a className="btn btn-primary btn-sm" href={"./invoice/" + IId}>
							<i className="fas fa-folder"></i>
							Invoice
						</a>
					) : (
						""
					)}
					<a
						className="btn btn-primary btn-sm"
						href={"./project/" + PId + "/detail"}
					>
						<i className="fas fa-folder"></i>
						View Project
					</a>
				</td>
			</tr>
		);
		return str;
	});
}
export default Invoices;
