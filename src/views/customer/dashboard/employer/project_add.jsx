import React, { Component } from "react";
import Axios from "axios";

import * as dataEmployer from "../../../data/employer.js";
import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import BodyLayout from "../../layouts/body";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

export default (props) => {
	const { isEdit = false, data = null } = props;
	const {
		userId = false,
		_id: projectId = null,
		name = null,
		description = null,
		company = null,
		leader = null,
		budget = null,
		total = null,
		duration = null,
		createdAt = null,
	} = data;
	return (
		<BodyLayout className="hold-transition sidebar-mini layout-fixed">
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
						{/* Main content */}
						<section className="content">
							<form action={isEdit ? "./edit" : "./add"} method="post">
								<div className="row">
									<div className="col-md-6">
										<div className="card card-primary">
											<div className="card-header">
												<h3 className="card-title">General</h3>
											</div>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="inputName">Project Name</label>
													<input
														type="text"
														id="inputName"
														className="form-control"
														name="name"
														defaultValue={name}
													/>
												</div>
												<div className="form-group">
													<label htmlFor="inputDescription">
														Project Description
													</label>
													<textarea
														id="inputDescription"
														className="form-control"
														rows="4"
														name="description"
														defaultValue={description}
													></textarea>
												</div>
												<div className="form-group">
													<label htmlFor="inputStatus">Status</label>
													<select
														id="inputStatus"
														className="form-control custom-select"
														name="status"
													>
														<option selected disabled>
															Select one
														</option>
														<option value="0">On Hold</option>
														<option value="-1">Canceled</option>
														<option value="1">Success</option>
													</select>
												</div>
												<div className="form-group">
													<label htmlFor="inputClientCompany">
														Client Company
													</label>
													<input
														type="text"
														id="inputClientCompany"
														className="form-control"
														name="company"
														defaultValue={company}
													/>
												</div>
												<div className="form-group">
													<label htmlFor="inputProjectLeader">
														Project Leader
													</label>
													<input
														type="text"
														id="inputProjectLeader"
														className="form-control"
														name="leader"
														defaultValue={leader}
													/>
												</div>
											</div>
											{/* /.card-body */}
										</div>
										{/* /.card */}
									</div>
									<div className="col-md-6">
										<div className="card card-secondary">
											<div className="card-header">
												<h3 className="card-title">Budget</h3>
											</div>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="inputEstimatedBudget">
														Estimated budget
													</label>
													<input
														type="number"
														id="inputEstimatedBudget"
														className="form-control"
														name="budget"
														defaultValue={budget}
													/>
												</div>
												<div className="form-group">
													<label htmlFor="inputSpentBudget">
														Total amount spent
													</label>
													<input
														type="number"
														id="inputSpentBudget"
														className="form-control"
														name="total"
														defaultValue={total}
													/>
												</div>
												<div className="form-group">
													<label htmlFor="inputEstimatedDuration">
														Estimated project duration
													</label>
													<input
														type="number"
														id="inputEstimatedDuration"
														className="form-control"
														name="duration"
														defaultValue={duration}
													/>
												</div>
											</div>
										</div>

										<div className="card card-secondary">
											<div className="card-header">
												<h3 className="card-title">Files</h3>
											</div>
											<div className="card-body">
												<FilesUploadComponent
													data={""}
													userId={userId}
													projectId={projectId}
												></FilesUploadComponent>
											</div>
											{/* /.card-body */}
										</div>
										{/* /.card */}
									</div>
								</div>
								<div className="row">
									<div className="col-12">
										<a href="#" className="btn btn-secondary">
											Cancel
										</a>
										<input
											type="submit"
											defaultValue={
												isEdit ? "Update Porject" : "Create new Porject"
											}
											className="btn btn-success float-right"
										/>
									</div>
								</div>
								<input type="hidden" name="userId" defaultValue={userId} />
								<input
									type="hidden"
									name="projectId"
									defaultValue={projectId}
								/>
							</form>
						</section>
						{/* /.content */}
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

class FilesUploadComponent extends Component {
	constructor(props) {
		super(props);
		const { data = null } = props;
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
		const { userId = null, projectId = null } = this.props;
		let formData = new FormData();
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
				</div>
			</form>
		);
	}
}
