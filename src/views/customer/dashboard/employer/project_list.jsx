import React from "react";

import * as dataEmployer from "../../../data/employer.js";
import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import BodyLayout from "../../layouts/body";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

import AvatarImg from "../../../data/img/avatar.png";
import Avatar2Img from "../../../data/img/avatar2.png";
import Avatar3Img from "../../../data/img/avatar3.png";
import Avatar4Img from "../../../data/img/avatar4.png";

function projects(props) {
	const { list = null } = props;

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
						{/* Default box */}
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Projects</h3>
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
										<ProjectsItem items={list}></ProjectsItem>
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
function ProjectsItem(props) {
	const { items = null } = props;
	return items.map((value, index) => {
		const {
			name = null,
			createdAt = null,
			request = null,
			frelancerId: FId = null,
			_id: PId = null,
		} = value;
		return (
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
						<li className="list-inline-item">
							<img alt="Avatar" className="table-avatar" src={Avatar2Img} />
						</li>
						<li className="list-inline-item">
							<img alt="Avatar" className="table-avatar" src={Avatar3Img} />
						</li>
						<li className="list-inline-item">
							<img alt="Avatar" className="table-avatar" src={Avatar4Img} />
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
					{FId ? (
						<a
							className="btn btn-primary btn-sm"
							href={"./invoice/" + PId + "/" + FId}
						>
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
						View
					</a>
					<a
						className="btn btn-info btn-sm"
						href={"./project/" + PId + "/edit"}
					>
						<i className="fas fa-pencil-alt"></i>
						Edit
					</a>
					<a
						className="btn btn-danger btn-sm"
						href={"./project/" + PId + "/del"}
					>
						<i className="fas fa-trash"></i>
						Delete
					</a>
				</td>
			</tr>
		);
	});
}
export default projects;
