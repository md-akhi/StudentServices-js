import React, { Component } from "react";
import ReactDOMServer from "react-dom/server";
//import Axios from "axios";

import * as dataFrelanser from "../../../dataTemp/frelanser.js";
import BreadCrumbComponet from "../../component/breadCrumb.jsx";
import FooterLayout from "../../layouts/footer.jsx";
import HtmlLayout from "../../layouts/html.jsx";
import MainSidebarLayout from "../../layouts/mainSidebar.jsx";
import NavbarLayout from "../../layouts/navbar.jsx";

export default (props) => {
	let data = props.data,
		invoice = { items: [], text: "" };
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
											</div>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="inputamount">Total amount</label>
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
										<div className="card card-secondary">
											<div className="card-header">
												<h3 className="card-title">invoce</h3>
											</div>
											<div className="card-body">
												<div className="form-group">
													<label htmlFor="ShowInvoce"> invoce</label>
													{/* <TodoApp></TodoApp> */}
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
												props.isEdit ? "Update Request" : "Create Request"
											}
											className="btn btn-success float-right"
										/>
										<input
											type="hidden"
											name="userId"
											defaultValue={props.user}
										/>
										<input
											type="hidden"
											name="projectId"
											defaultValue={props.project}
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
		</HtmlLayout>
	);
};

class TodoList extends Component {
	render() {
		var i = 0;
		var createItem = function (itemText) {
			return <li key={i++}>{itemText}</li>;
		};
		return <ul>{this.props.items.map(createItem)}</ul>;
	}
}

class TodoApp extends Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = props;
	}
	onChange(e) {
		this.setState({ text: e.target.value });
	}
	handleSubmit(e) {
		e.preventDefault();
		var nextItems = this.state.items.concat([this.state.text]);
		var nextText = "";
		this.setState({ items: nextItems, text: nextText });
	}
	render() {
		return (
			<div className="container">
				<h3>TODO List</h3>
				<TodoList items={this.state.items} />
				<form className="form-inline" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input
							type="text"
							className="form-control"
							placeholder="Write task"
							onChange={this.onChange}
							value={this.state.text}
						/>
						&nbsp;
					</div>
					<a className="btn btn-primary">
						{"Add #" + (this.state.items.length + 1)}
					</a>
				</form>
			</div>
		);
	}
}
