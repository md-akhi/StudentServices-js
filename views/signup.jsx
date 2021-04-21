var React = require("react");

function signup(props) {
  return (
    <form method="post" action="/signup">
      <h3>Sign Up {props.name}{props.message}</h3>
      <div className="form-group">
        <label>Full name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Full name"
          name="fullname"
        />
      </div>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="passwordConfirmation"
        />
      </div>
      <button type="submit" className="btn btn-primary btn-block">
        Sign Up
      </button>
      <p className="forgot-password text-right">
        Already registered <a href="/login">sign in?</a>
      </p>
    </form>
  );
}

module.exports = signup;
