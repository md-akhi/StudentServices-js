import React from "react";

function BreadCrumbComponet(props) {
	return (
		<div className="content-header">
			{/* Content Header (Page header) */}
			<div className="container-fluid">
				<div className="row mb-2">
					<div className="col-sm-6">
						<h1 className="m-0">{props.Name}</h1>
					</div>
					{/* /.col */}
					<div className="col-sm-6">
						<ol className="breadcrumb float-sm-right">
							<Item Data={props.Data} Active={props.Active}></Item>
						</ol>
					</div>
					{/* /.col */}
				</div>
				{/* /.row */}
			</div>
			{/* /.container-fluid */}
			{/* /.content-header */}
		</div>
	);
}

function Item(props) {
	let listItems = [],
		sum = 0;
	Object.entries(props.Data).forEach(([key, value]) => {
		if (key == props.Active) {
			listItems[sum++] = <li className="breadcrumb-item active">{key}</li>;
		} else
			listItems[sum++] = (
				<li className="breadcrumb-item">
					<a href={value}>{key}</a>
				</li>
			);
	});
	return listItems;
}

export default BreadCrumbComponet;
