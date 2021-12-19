import React, { Component } from "react";
import Axios from "axios";

import * as dataFrelanser from "../../../data/frelanser.js";
import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import BodyLayout from "../../layouts/body";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

import User1Img from "../../../data/img/user1-128x128.jpg";
import User7Img from "../../../data/img/user7-128x128.jpg";

export default (props) => {
	const { data = null, requests = null, files = null } = props;
	const {
		_id: projectId = null,
		userId = null,
		budget = null,
		duration = null,
		frelancerId = null,
		name = null,
		description = null,
	} = data;
	return (
		<BodyLayout className="hold-transition sidebar-mini layout-fixed">
			<NavbarLayout NavbarLinks={dataFrelanser.linkNavUp}></NavbarLayout>
			<MainSidebarLayout
				Data={dataFrelanser.menuSidbarRight}
			></MainSidebarLayout>

			{/* Content Wrapper. Contains page content */}
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<BreadCrumbComponet
					Data={dataFrelanser.breadCrumb}
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
								<h3 className="card-title">Projects Detail</h3>
							</div>
							<div className="card-body">
								<div className="row">
									<div className="col-12 col-md-12 col-lg-8 order-2 order-md-1">
										<div className="row">
											<div className="col-12 col-sm-4">
												<div className="info-box bg-light">
													<div className="info-box-content">
														<span className="info-box-text text-center text-muted">
															Estimated budget
														</span>
														<span className="info-box-number text-center text-muted mb-0">
															{budget}
														</span>
													</div>
												</div>
											</div>
											<div className="col-12 col-sm-4">
												<div className="info-box bg-light">
													<div className="info-box-content">
														<span className="info-box-text text-center text-muted">
															Total amount spent
														</span>
														<span className="info-box-number text-center text-muted mb-0">
															0
														</span>
													</div>
												</div>
											</div>
											<div className="col-12 col-sm-4">
												<div className="info-box bg-light">
													<div className="info-box-content">
														<span className="info-box-text text-center text-muted">
															Estimated project duration
														</span>
														<span className="info-box-number text-center text-muted mb-0">
															{duration}
														</span>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-12">
												<h4>Recent Activity</h4>
												<RequestItem
													data={requests}
													active={frelancerId == undefined ? true : false}
												></RequestItem>
												<div className="post">
													<div className="user-block">
														<img
															className="img-circle img-bordered-sm"
															src={User1Img}
															alt="user image"
														/>
														<span className="username">
															<a href="#">Jonathan Burke Jr.</a>
														</span>
														<span className="description">
															Shared publicly - 7:45 PM today
														</span>
													</div>
													{/* /.user-block */}
													<p>
														Lorem ipsum represents a long-held tradition for
														designers, typographers and the like. Some people
														hate it and argue for its demise, but others ignore.
													</p>

													<p>
														<a href="#" className="link-black text-sm">
															<i className="fas fa-link mr-1"></i> Demo File 1
															v2
														</a>
													</p>
												</div>

												<div className="post clearfix">
													<div className="user-block">
														<img
															className="img-circle img-bordered-sm"
															src={User7Img}
															alt="User Image"
														/>
														<span className="username">
															<a href="#">Sarah Ross</a>
														</span>
														<span className="description">
															Sent you a message - 3 days ago
														</span>
													</div>
													{/* /.user-block */}
													<p>
														Lorem ipsum represents a long-held tradition for
														designers, typographers and the like. Some people
														hate it and argue for its demise, but others ignore.
													</p>
													<p>
														<a href="#" className="link-black text-sm">
															<i className="fas fa-link mr-1"></i> Demo File 2
														</a>
													</p>
												</div>

												<div className="post">
													<div className="user-block">
														<img
															className="img-circle img-bordered-sm"
															src={User1Img}
															alt="user image"
														/>
														<span className="username">
															<a href="#">Jonathan Burke Jr.</a>
														</span>
														<span className="description">
															Shared publicly - 5 days ago
														</span>
													</div>
													{/* /.user-block */}
													<p>
														Lorem ipsum represents a long-held tradition for
														designers, typographers and the like. Some people
														hate it and argue for its demise, but others ignore.
													</p>

													<p>
														<a href="#" className="link-black text-sm">
															<i className="fas fa-link mr-1"></i> Demo File 1
															v1
														</a>
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="col-12 col-md-12 col-lg-4 order-1 order-md-2">
										<h3 className="text-primary">
											<i className="fas fa-paint-brush"></i> {name}
										</h3>
										<p className="text-muted">{description}</p>
										<br />
										<div className="text-muted">
											<p className="text-sm">
												Client Company
												<b className="d-block">Deveint Inc</b>
											</p>
											<p className="text-sm">
												Project Leader
												<b className="d-block">Tony Chicken</b>
											</p>
										</div>

										<h5 className="mt-5 text-muted">Project files</h5>
										<FilesUploadComponent
											files={files}
											userId={userId}
											projectId={projectId}
										></FilesUploadComponent>
										<FilesComponent files={files}></FilesComponent>
									</div>
								</div>
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
};

function RequestItem(props) {
	const { files = null } = props;
	return files.map((item, index) => {
		return (
			<div className="post">
				<div className="user-block">
					<img
						className="img-circle img-bordered-sm"
						src={User1Img}
						alt="user image"
					/>
					<span className="username">
						<a href="#">{item.userId.role}Jonathan Burke Jr.</a>
					</span>
					<span className="description">Shared publicly - 7:45 PM today</span>
				</div>
				{/* /.user-block */}
				<p>{item.description}</p>

				<p>
					<a href="#" className="link-black text-sm">
						<i className="fas fa-link mr-1"></i> Demo File 1 v2
					</a>
				</p>

				<div className="text-center mt-5 mb-3">
					{props.active ? (
						<a href={"./set/" + item._id} className="btn btn-sm btn-primary">
							Accept Request
						</a>
					) : (
						""
					)}
				</div>
			</div>
		);
	});
}

class FilesUploadComponent extends Component {
	constructor(props) {
		super(props);
		const { data = null } = props;
		this.userId = userId;
		this.projectId = projectId;
		this.onFileChange = this.onFileChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			files: {}, //data
		};
	}

	onFileChange(e) {
		this.setState({ files: e.target.files });
	}

	onSubmit(e) {
		e.preventDefault();
		let formData = new FormData();
		const { userId = null, projectId = null } = this.props;
		formData.append("userId", userId);
		formData.append("projectId", projectId);
		for (const [key, value] of Object.entries(this.state.files)) {
			formData.append(key, value);
		}
		Axios.post("/api/employer/upload", formData, {}).then((res) => {
			console.log(res);
		});
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} encType="multipart/form-data">
				<div className="form-group">
					<label htmlFor="inputFiles">Files</label>
					<input
						type="file"
						name="files"
						onChange={this.onFileChange}
						multiple
					/>
				</div>
				<div className="form-group">
					<button className="btn btn-primary" type="submit">
						Upload
					</button>
					<div className="text-center mt-5 mb-3">
						<a href="#" className="btn btn-sm btn-primary" type="submit">
							Upload files
						</a>
						<a href="#" className="btn btn-sm btn-warning">
							Report contact
						</a>
					</div>
				</div>
			</form>
		);
	}
}

class FilesComponent extends Component {
	constructor(props) {
		super(props);
		const { files = null } = props;
		this.files = files;
		this.onFileDownload = this.onFileDownload.bind(this);
	}

	onFileDownload(e) {
		e.preventDefault();
		const fileId = e.target.getAttribute("data-file-id");
		Axios.get("/api/employer/download/" + fileId).then((res) => {
			console.log(res);
		});
	}

	render() {
		return (
			<ul className="list-unstyled">
				<li>
					<a href="" className="btn-link text-secondary">
						<i className="far fa-fw fa-file-word"></i>{" "}
						Functional-requirements.docx
					</a>
				</li>
				<li>
					<a href="" className="btn-link text-secondary">
						<i className="far fa-fw fa-file-pdf"></i> UAT.pdf
					</a>
				</li>
				<li>
					<a href="" className="btn-link text-secondary">
						<i className="far fa-fw fa-envelope"></i> Email-from-flatbal.mln
					</a>
				</li>
				<li>
					<a href="" className="btn-link text-secondary">
						<i className="far fa-fw fa-image "></i> Logo.png
					</a>
				</li>
			</ul>
		);
	}
}
