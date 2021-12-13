import React, { Component, useState, useReducer, useRef } from "react";
//import Axios from "axios";

import * as dataFrelanser from "../../../data/frelanser.js";
import BreadCrumbComponet from "../../component/breadCrumb.jsx";
import FooterLayout from "../../layouts/footer.jsx";
import BodyLayout from "../../layouts/body.jsx";
import MainSidebarLayout from "../../layouts/mainSidebar.jsx";
import NavbarLayout from "../../layouts/navbar.jsx";

export default (props) => {
	const { data = null, isEdit = false } = props;
	const {
		userId = null,
		projectId = null,
		description = null,
		duration = null,
		invoice = [],
		createdAt = null,
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
					Name={"Request"}
					Active={"Add"}
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
													<label htmlFor="inputDescription">
														Request Description
													</label>
													<textarea
														id="inputDescription"
														className="form-control"
														rows="4"
														name="description"
														defaultValue={description}
													></textarea>
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
													<InvocesApp data={invoice}></InvocesApp>
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
												isEdit ? "Update Request" : "Create Request"
											}
											className="btn btn-success float-right"
										/>
										<input type="hidden" name="userId" defaultValue={userId} />
										<input
											type="hidden"
											name="projectId"
											defaultValue={projectId}
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
			{/* <script
				dangerouslySetInnerHTML={{
					__html: "window.__PRELOADED_STATE__ =" + JSON.stringify(props),
				}}
			></script> */}
		</BodyLayout>
	);
};

function InvocesApp(props) {
	const { data = [] } = props;
	const [items, setItems] = useState(data);
	const [item, setItem] = useState({
		description: "",
		amount: 0,
	});

	const onChange = (e) => {
		let { description = "", amount = 0 } = item;
		if (e.target.name == "idescription") {
			description = e.target.value;
		} else if (e.target.name == "iamount") {
			amount = e.target.value;
		}
		setItem({
			description: description,
			amount: amount,
		});
	};

	const handleRemove = (e, id) => {
		const itms = items.filter((item, index) => {
			if (id !== index) return item;
		});
		// Update state with filter
		setItems([...itms]);
	};

	const handleEdit = (e, id, description, amount) => {
		handleRemove(e, id);
		setItem({
			description: description,
			amount: amount,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setItems([...items, item]);
		setItem({ description: "", amount: 0 });
	};

	return (
		<div>
			<div className="form-group">
				<label htmlFor="inputamount">Total amount:</label>
				{items.reduce((total, item) => total + item.amount, 0)}
			</div>
			<ul>
				{items.map((item, index) => {
					const { description = "", amount = 0 } = item;
					return (
						<li key={index.toString()} onClick={(e) => handleRemove(e, index)}>
							{index + 1}:{description} - ${amount}{" "}
							<a
								className="btn btn-primary"
								onClick={(e) => handleEdit(e, index, description, amount)}
							>
								{"Edit #" + (index + 1)}
							</a>
							<a
								className="btn btn-primary"
								onClick={(e) => handleRemove(e, index)}
							>
								*
							</a>
							{/* <a onClick={this.props.remove(item._id)}> [*] </a> */}
						</li>
					);
				})}
				<li>
					{items.length + 1}: {item.description} - ${item.amount}
				</li>
			</ul>
			<div className="form-group">
				<input
					type="text"
					className="form-control"
					placeholder="Write task"
					name="idescription"
					onChange={onChange}
					value={item.description}
				/>
				<input
					type="number"
					className="form-control"
					name="iamount"
					onChange={onChange}
					value={item.amount}
				/>
				&nbsp;
				<input
					type="hidden"
					name="invoice[]"
					defaultValue={"" + JSON.stringify(items) + ""}
				/>
			</div>
			<a className="btn btn-primary" onClick={handleSubmit}>
				{"Add #" + (items.length + 1)}
			</a>
		</div>
	);
}
