var React = require("react");

function dashborad(props) {
  return (
    <div>
      <div>Hello {props.name}</div>
      <ul>
        <li>
          <a href="/auth/logout">Logout</a>
        </li>
      </ul>
    </div>
  );
}

module.exports = dashborad;
