import React from "react";

import * as dataFrelanser from "../../../dataTemp/frelanser.cjs";
import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import HtmlLayout from "../../layouts/html";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

function requestAdd(props) {
	let data = props.data;
	let userId = <input type="hidden" name="userId" value={props.user} />;
	let projectId = (
		<input type="hidden" name="projectId" value={props.project} />
	);
	return (
		<HtmlLayout className="hold-transition sidebar-mini layout-fixed">
			<NavbarLayout NavbarLinks={dataFrelanser.linkNavUp}></NavbarLayout>
			<MainSidebarLayout
				Data={dataFrelanser.menuSidbarRight}
			></MainSidebarLayout>

			{/* Content Wrapper. Contains page content */}
			<div className="content-wrapper">
				{/* Content Header (Page header) */}
				<BreadCrumbComponet
					Data={dataFrelanser.breadCrumb}
					Name={"Request"}
					Active={"Add"}
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
													<label htmlFor="inputDescription">
														Request Description
													</label>
													<textarea
														id="inputDescription"
														className="form-control"
														rows="4"
														name="description"
														defaultValue={props.isEdit ? data.description : ""}
													></textarea>
												</div>
											</div>
											{/* /.card-body */}
										</div>
										{/* /.card */}
									</div>
									<div className="col-md-6">
										<div className="card card-secondary">
											<div className="card-header">
												<h3 className="card-title">Expense</h3>

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
													<label htmlFor="inputamount">Total amount</label>
													<input
														type="number"
														id="inputamount"
														className="form-control"
														name="amount"
														value={props.isEdit ? data.amount : ""}
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
														value={props.isEdit ? data.estimatedDuration : ""}
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
											value={props.isEdit ? "Update Request" : "Create Request"}
											className="btn btn-success float-right"
										/>
										{!props.isEdit && userId}
										{!props.isEdit && projectId}
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
		</HtmlLayout>
	);
}

export default requestAdd;
