import React from "react";

import BreadCrumbComponet from "../../component/breadCrumb";
import FooterLayout from "../../layouts/footer";
import HtmlLayout from "../../layouts/html";
import MainSidebarLayout from "../../layouts/mainSidebar";
import NavbarLayout from "../../layouts/navbar";

function projectDetail(props) {
	let data = props.data;
	return (
		<HtmlLayout className="hold-transition sidebar-mini layout-fixed">
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
						{/* Default box */}
						<div className="card">
							<div className="card-header">
								<h3 className="card-title">Projects Detail</h3>

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
															{data.estimatedBudget}
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
															{data.estimatedDuration}
														</span>
													</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-12">
												<h4>Recent Activity</h4>
												<div className="post">
													<div className="user-block">
														<img
															className="img-circle img-bordered-sm"
															src="/img/user1-128x128.jpg"
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
															src="/img/user7-128x128.jpg"
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
															src="/img/user1-128x128.jpg"
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
											<i className="fas fa-paint-brush"></i> {data.name}
										</h3>
										<p className="text-muted">{data.description}</p>
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
													<i className="far fa-fw fa-envelope"></i>{" "}
													Email-from-flatbal.mln
												</a>
											</li>
											<li>
												<a href="" className="btn-link text-secondary">
													<i className="far fa-fw fa-image "></i> Logo.png
												</a>
											</li>
											<li>
												<a href="" className="btn-link text-secondary">
													<i className="far fa-fw fa-file-word"></i>{" "}
													Contract-10_12_2014.docx
												</a>
											</li>
										</ul>
										<div className="text-center mt-5 mb-3">
											<a href="#" className="btn btn-sm btn-primary">
												Add files
											</a>
											<a href="#" className="btn btn-sm btn-warning">
												Report contact
											</a>
										</div>
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
		</HtmlLayout>
	);
}

export default projectDetail;
