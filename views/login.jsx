var React = require('react');

function login(props) {
  return (
    <form method="post" action="/login">
      <h3>Login {props.name}{props.message}</h3>
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
      <button type="submit" className="btn btn-primary btn-block">
      Login
      </button>
    </form>
  );
}

module.exports = login;
