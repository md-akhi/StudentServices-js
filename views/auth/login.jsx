import React from "react";
import HtmlLayout from "../customer/layouts/html";

function login(props) {
	return (
		<HtmlLayout class="hold-transition login-page">
			<div className="login-box">
				{/* /.login-logo */}
				<div className="card card-outline card-primary">
					<div className="card-header text-center">
						<a href="/" className="h1">
							<b>Admin</b>LTE
						</a>
					</div>
					<div className="card-body">
						<p className="login-box-msg">Sign in to start your session</p>

						<form
							action={
								props.redirect ? "login?redirect=" + props.redirect : "login"
							}
							method="post"
						>
							<div className="input-group mb-3">
								<input
									type="email"
									className="form-control"
									placeholder="Email"
									name="email"
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-envelope"></span>
									</div>
								</div>
							</div>
							<div className="input-group mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Password"
									name="password"
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-lock"></span>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-8">
									<div className="icheck-primary">
										<input type="checkbox" id="remember" />
										<label htmlFor="remember">Remember Me</label>
									</div>
								</div>
								{/* /.col */}
								<div className="col-4">
									<button type="submit" className="btn btn-primary btn-block">
										Sign In
									</button>
								</div>
								{/* /.col */}
							</div>
						</form>

						<div className="social-auth-links text-center mt-2 mb-3">
							<a href="#" className="btn btn-block btn-primary">
								<i className="fab fa-facebook mr-2"></i> Sign in using Facebook
							</a>
							<a href="#" className="btn btn-block btn-danger">
								<i className="fab fa-google-plus mr-2"></i> Sign in using
								Google+
							</a>
						</div>
						{/* /.social-auth-links */}

						<p className="mb-1">
							<a href="forgot-password">I forgot my password</a>
						</p>
						<p className="mb-0">
							<a href="register" className="text-center">
								Register a new membership
							</a>
						</p>
					</div>
					{/* /.card-body */}
				</div>
				{/* /.card */}
			</div>
			{/* /.login-box */}
		</HtmlLayout>
	);
}

export default login;
