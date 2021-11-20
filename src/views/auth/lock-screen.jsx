import React from "react";
import BodyLayout from "../customer/layouts/body";

import User1Img from "../data/img/user1-128x128.jpg";

function lockScreen(props) {
	return (
		<BodyLayout class="hold-transition lockscreen">
			{/* Automatic element centering */}
			<div className="lockscreen-wrapper">
				<div className="lockscreen-logo">
					<a href="/">
						<b>Admin</b>LTE
					</a>
				</div>
				{/* User name */}
				<div className="lockscreen-name">John Doe</div>

				{/* START LOCK SCREEN ITEM */}
				<div className="lockscreen-item">
					{/* lockscreen image */}
					<div className="lockscreen-image">
						<img src={User1Img} alt="User Image" />
					</div>
					{/* /.lockscreen-image */}

					{/* lockscreen credentials (contains the form) */}
					<form className="lockscreen-credentials">
						<div className="input-group">
							<input
								type="password"
								className="form-control"
								placeholder="password"
							/>

							<div className="input-group-append">
								<button type="button" className="btn">
									<i className="fas fa-arrow-right text-muted"></i>
								</button>
							</div>
						</div>
					</form>
					{/* /.lockscreen credentials */}
				</div>
				{/* /.lockscreen-item */}
				<div className="help-block text-center">
					Enter your password to retrieve your session
				</div>
				<div className="text-center">
					<a href="login">Or sign in as a different user</a>
				</div>
				<div className="lockscreen-footer text-center">
					Copyright &copy; 2014-2021{" "}
					<b>
						<a href="/" className="text-black">
							Md.Akhi.ir
						</a>
					</b>
					<br />
					All rights reserved
				</div>
			</div>
			{/* /.center */}
		</BodyLayout>
	);
}

export default lockScreen;
