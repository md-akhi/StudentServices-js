var React = require("react");
var DefaultLayout = require("./layouts/default");

function home(props) {
  return (
    <DefaultLayout title={props.title}>
      <div>Hello {props.name}</div>
      <a href="/login">login</a>
      <a href="/signup">signup</a>
      <a href="/logout">Logout</a>
      <a href="/dashborad">dashborad</a>
    </DefaultLayout>
  );
}

module.exports = home;
