import React from "react";

import LogoImg from "../../data/img/AdminLTELogo.png";
import User2Img from "../../data/img/user2-160x160.jpg";

export default(props)=>{
	return (
		<aside className="main-sidebar sidebar-dark-primary elevation-4">
			{/* Main Sidebar Container */}
			{/* Brand Logo */}
			<a href="#" className="brand-link">
				<img
					src={LogoImg}
					alt="AdminLTE Logo"
					className="brand-image img-circle elevation-3"
					style={{ opacity: ".8" }}
				/>
				<span className="brand-text font-weight-light">Student Services</span>
			</a>

			{/* Sidebar */}
			<div className="sidebar">
				{/* Sidebar user panel (optional) */}
				<div className="user-panel mt-3 pb-3 mb-3 d-flex">
					<div className="image">
						<img
							src={User2Img}
							className="img-circle elevation-2"
							alt="User Image"
						/>
					</div>
					<div className="info">
						<a href="#" className="d-block">
							Md Akhi
						</a>
					</div>
				</div>

				{/* SidebarSearch Form */}
				<div className="form-inline">
					<div className="input-group" data-widget="sidebar-search">
						<input
							className="form-control form-control-sidebar"
							type="search"
							placeholder="Search"
							aria-label="Search"
						/>
						<div className="input-group-append">
							<button className="btn btn-sidebar">
								<i className="fas fa-search fa-fw"></i>
							</button>
						</div>
					</div>
				</div>

				{/* Sidebar Menu */}
				<nav className="mt-2">
					<ul
						className="nav nav-pills nav-sidebar flex-column"
						data-widget="treeview"
						role="menu"
						data-accordion="false"
					>
						{/* Add icons to the links using the .nav-icon className
               with font-awesome or any other icon font library */}
						<MenuSidbar Data={props.Data}></MenuSidbar>
						<li className="nav-item menu-open">
							<a href="#" className="nav-link active">
								<i className="nav-icon fas fa-tachometer-alt"></i>
								<p>
									پروژه
									<i className="right fas fa-angle-left"></i>
								</p>
							</a>
							<ul className="nav nav-treeview">
								<li className="nav-item active">
									<a href="#" className="nav-link ">
										<i className="far fa-circle nav-icon"></i>
										<p>لیست</p>
									</a>
								</li>
								<li className="nav-item">
									<a href="#" className="nav-link ">
										<i className="far fa-circle nav-icon"></i>
										<p>ایجاد</p>
									</a>
								</li>
							</ul>
						</li>
						<li className="nav-item">
							<a href="pages/widgets.html" className="nav-link">
								<i className="nav-icon fas fa-th"></i>
								<p>
									Widgets
									<span className="right badge badge-danger">New</span>
								</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link">
								<i className="nav-icon fas fa-copy"></i>
								<p>
									Layout Options
									<i className="fas fa-angle-left right"></i>
									<span className="badge badge-info right">6</span>
								</p>
							</a>
							<ul className="nav nav-treeview">
								<li className="nav-item">
									<a href="pages/layout/top-nav.html" className="nav-link">
										<i className="far fa-circle nav-icon"></i>
										<p>Top Navigation</p>
									</a>
								</li>
							</ul>
						</li>
						<li className="nav-header">EXAMPLES</li>

						<li className="nav-item">
							<a href="#" className="nav-link">
								<i className="nav-icon far fa-envelope"></i>
								<p>
									Mailbox
									<i className="fas fa-angle-left right"></i>
								</p>
							</a>
							<ul className="nav nav-treeview">
								<li className="nav-item">
									<a href="pages/mailbox/mailbox.html" className="nav-link">
										<i className="far fa-circle nav-icon"></i>
										<p>Inbox</p>
									</a>
								</li>
							</ul>
						</li>
						<li className="nav-header">MISCELLANEOUS</li>
						<li className="nav-item">
							<a href="iframe.html" className="nav-link">
								<i className="nav-icon fas fa-ellipsis-h"></i>
								<p>Tabbed IFrame Plugin</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link">
								<i className="nav-icon fas fa-file"></i>
								<p>Documentation</p>
							</a>
						</li>
						<li className="nav-header">MULTI LEVEL EXAMPLE</li>
						<li className="nav-item">
							<a href="#" className="nav-link">
								<i className="nav-icon fas fa-circle"></i>
								<p>
									Level 1<i className="right fas fa-angle-left"></i>
								</p>
							</a>
							<ul className="nav nav-treeview">
								<li className="nav-item">
									<a href="#" className="nav-link">
										<i className="far fa-circle nav-icon"></i>
										<p>
											Level 2<i className="right fas fa-angle-left"></i>
										</p>
									</a>
									<ul className="nav nav-treeview">
										<li className="nav-item">
											<a href="#" className="nav-link">
												<i className="far fa-dot-circle nav-icon"></i>
												<p>Level 3</p>
											</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li className="nav-header">LABELS</li>
						<li className="nav-item">
							<a href="#" className="nav-link">
								<i className="nav-icon far fa-circle text-danger"></i>
								<p className="text">Important</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link">
								<i className="nav-icon far fa-circle text-warning"></i>
								<p>Warning</p>
							</a>
						</li>
						<li className="nav-item">
							<a href="#" className="nav-link">
								<i className="nav-icon far fa-circle text-info"></i>
								<p>Informational</p>
							</a>
						</li>
					</ul>
				</nav>
				{/* /.sidebar-menu */}
			</div>
			{/* /.sidebar */}
		</aside>
	);
}

function MenuSidbar(props) {
	let listItems = [],
		sum = 0;
	Object.entries(props.Data).forEach(
		([key, value]) =>
			(listItems[sum++] = (
				<li className="nav-item">
					<a href="#" className="nav-link">
						<i className={"nav-icon " + value.icon}></i>
						<p>
							{value.name}
							<i className="right fas fa-angle-left"></i>
						</p>
					</a>
					<ul className="nav nav-treeview">
						<SubMenuSidbar Data={value.sub}></SubMenuSidbar>
					</ul>
				</li>
			))
	);
	return listItems;
}

function SubMenuSidbar(props) {
	let listItems = [],
		sum = 0;
	Object.entries(props.Data).forEach(
		([key, value]) =>
			(listItems[sum++] = (
				<li className="nav-item">
					<a href={value} className="nav-link">
						<i className="far fa-circle nav-icon"></i>
						<p>{key}</p>
					</a>
				</li>
			))
	);
	return listItems;
}
