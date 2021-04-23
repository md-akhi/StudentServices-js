var React = require("react");

function DefaultLayout(props) {
  return (
    <html>
      <head>
        <title>{props.title}</title>
      </head>
    </html>
  );
}

module.exports = DefaultLayout;
