import React, { Component, useState } from "react";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import * as dataEmployer from "../../../data/employer.js";
import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import BodyLayout from "../../layouts/body";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

export default (props) => {
	const { isEdit = false, data = null } = props;
	const {
		userId = 0,
		_id: projectId = 0,
		name = "",
		description = "",
		company = "",
		leader = "",
		budget = 0,
		total = 0,
		duration = 0,
		createdAt = null,
	} = data;

	const [nameProject, setNameProject] = useState(name);
	const [descriptionProject, setDescriptionProject] = useState(description);
	const [companyProject, setCompanyProject] = useState(company);
	const [leaderProject, setLeaderProject] = useState(leader);
	const [budgetProject, setBudgetProject] = useState(budget);
	const [totalProject, setTotalProject] = useState(total);
	const [durationProject, setDurationProject] = useState(duration);

	const [checkForm, setCheckForm] = useState({
		name: isEdit,
		description: isEdit,
		company: isEdit,
		leader: isEdit,
		budget: isEdit,
		total: isEdit,
		duration: isEdit,
	});
	const [isValid, setIsValid] = useState(isEdit);

	const validForm = (obj) => {
		setCheckForm({ ...checkForm, ...obj });
		let result = true;
		for (const [key, value] of Object.entries(checkForm)) {
			if (value === false) result = false;
		}
		setIsValid(result);
	};

	const CheckName = (e) => {
		setNameProject(e.target.value);
		if (nameProject.length == 0) {
			// toast.error("name false");
			validForm({ name: false });
			return;
		}
		// toast.success("name true");
		validForm({ name: true });
	};
	const CheckDescription = (e) => {
		setDescriptionProject(e.target.value);
		if (descriptionProject.length == 0) {
			// toast.error("description false");
			validForm({ description: false });
			return;
		}
		// toast.success("description true");
		validForm({ description: true });
	};
	const CheckCompany = (e) => {
		setCompanyProject(e.target.value);
		if (companyProject.length == 0) {
			// toast.error("company false");
			validForm({ company: false });
			return;
		}
		// toast.success("company true");
		validForm({ company: true });
	};
	const CheckLeader = (e) => {
		setLeaderProject(e.target.value);
		if (leaderProject.length == 0) {
			// toast.error("leader false");
			validForm({ leader: false });
			return;
		}
		// toast.success("leader true");
		validForm({ leader: true });
	};
	const CheckBudget = (e) => {
		setBudgetProject(e.target.value);
		if (budgetProject <= 0) {
			// toast.error("budget false");
			validForm({ budget: false });
			return;
		}
		// toast.success("budget true");
		validForm({ budget: true });
	};
	const CheckTotal = (e) => {
		setTotalProject(e.target.value);
		if (totalProject <= 0) {
			// toast.error("total false");
			validForm({ total: false });
			return;
		}
		// toast.success("total true");
		validForm({ total: true });
	};
	const CheckDuration = (e) => {
		setDurationProject(e.target.value);
		if (durationProject <= 0) {
			// toast.error("duration false");
			validForm({ duration: false });
			return;
		}
		// toast.success("duration true");
		validForm({ duration: true });
	};
	const HandleSubmit = (e) => {
		e.preventDefault();
	};

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
						<Toaster />
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
														onChange={(e) => CheckName(e)}
														defaultValue={nameProject}
														required
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
														onChange={(e) => CheckDescription(e)}
														defaultValue={descriptionProject}
														required
													></textarea>
												</div>
												<div className="form-group">
													<label htmlFor="inputStatus">Status</label>
													<select
														id="inputStatus"
														className="form-control custom-select"
														name="status"
														onChange={(e) => "setStatusProject(e)"}
													>
														<option selected disabled>
															Select one
														</option>
														<option defaultValue="0">On Hold</option>
														<option defaultValue="-1">Canceled</option>
														<option defaultValue="1">Success</option>
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
														onChange={(e) => CheckCompany(e)}
														defaultValue={companyProject}
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
														onChange={(e) => CheckLeader(e)}
														defaultValue={leaderProject}
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
														onChange={(e) => CheckBudget(e)}
														defaultValue={budgetProject}
														required
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
														onChange={(e) => CheckTotal(e)}
														defaultValue={totalProject}
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
														onChange={(e) => CheckDuration(e)}
														defaultValue={durationProject}
														required
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
										<button
											type="submit"
											disabled={!isValid}
											className="btn btn-success float-right"
										>
											{isEdit ? "Update Porject" : "Create Porject"}
										</button>
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
		Axios.post("/api/employer/upload", formData, {})
			.then((res) => {
				toast.success("uploaded successfully");
				console.log(res);
			})
			.catch((err) => {
				toast.error("upload failed");
				console.log(err);
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
