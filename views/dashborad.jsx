var React = require("react");
var DefaultLayout = require("./layouts/default");

function dashborad(props) {
  return (
    <DefaultLayout title={props.title}>
      <div>Hello Dashborad</div>
      <a href="/logout">Logout</a>
      </DefaultLayout>
  );
}

module.exports = dashborad;
