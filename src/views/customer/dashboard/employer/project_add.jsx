import React from "react";

import * as dataEmployer from "../../../data/employer.js";
import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import BodyLayout from "../../layouts/body";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

function projectAdd(props) {
	let data = props.data;
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
							<form action={props.isEdit ? "./edit" : "./add"} method="post">
								<div className="row">
									<div className="col-md-6">
										<div className="card card-primary">
											<div className="card-header">
												<h3 className="card-title">General</h3>

												<div className="card-tools">
													<button
														type="button"
														className="btn btn-tool"
														data-card-widget="collapse"
														title="Collapse"
													>
														<i className="fas fa-minus"></i>
													</button>
												</div>
											</div>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="inputName">Project Name</label>
													<input
														type="text"
														id="inputName"
														className="form-control"
														name="name"
														defaultValue={props.isEdit ? data.name : ""}
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
														defaultValue={props.isEdit ? data.description : ""}
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
														<option value="Hold">On Hold</option>
														<option value="Canceled">Canceled</option>
														<option value="Success">Success</option>
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
														defaultValue={props.isEdit ? data.company : ""}
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
														defaultValue={props.isEdit ? data.leader : ""}
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

												<div className="card-tools">
													<button
														type="button"
														className="btn btn-tool"
														data-card-widget="collapse"
														title="Collapse"
													>
														<i className="fas fa-minus"></i>
													</button>
												</div>
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
														defaultValue={
															props.isEdit ? data.estimatedBudget : ""
														}
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
														defaultValue={props.isEdit ? data.total : ""}
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
														defaultValue={
															props.isEdit ? data.estimatedDuration : ""
														}
													/>
												</div>
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
												props.isEdit ? "Update Porject" : "Create new Porject"
											}
											className="btn btn-success float-right"
										/>
									</div>
								</div>
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
}

export default projectAdd;
