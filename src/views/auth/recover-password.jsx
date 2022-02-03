import React from "react";
import BodyLayout from "../customer/layouts/body";

function recoverPassword(props) {
	return (
		<BodyLayout className="hold-transition login-page">
			<div className="login-box">
				<div className="card card-outline card-primary">
					<div className="card-header text-center">
						<a href="/" className="h1">
							<b>Admin</b>LTE
						</a>
					</div>
					<div className="card-body">
						<p className="login-box-msg">
							You are only one step a way from your new password, recover your
							password now.
						</p>
						<form action="login" method="post">
							<div className="input-group mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Password"
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-lock"></span>
									</div>
								</div>
							</div>
							<div className="input-group mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Confirm Password"
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-lock"></span>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<button type="submit" className="btn btn-primary btn-block">
										Change password
									</button>
								</div>
								{/* /.col */}
							</div>
						</form>

						<p className="mt-3 mb-1">
							<a href="login">Login</a>
						</p>
					</div>
					{/* /.login-card-body */}
				</div>
			</div>
			{/* /.login-box */}
		</BodyLayout>
	);
}

export default recoverPassword;
