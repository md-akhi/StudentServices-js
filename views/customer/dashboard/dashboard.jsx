var React = require("react");

function dashborad(props) {
  return (
    <div>
      <div>Hello Dashboard</div>
      <ul>
        <li>
          <a href="/dashboard/frelanser">فریلنسر</a>
        </li>
        <li>
          <a href="/dashboard/employer">کارفرما</a>
        </li>
        <li>
          <a href="/dashboard/logout">خروج</a>
        </li>
      </ul>
    </div>
  );
}

module.exports = dashborad;
