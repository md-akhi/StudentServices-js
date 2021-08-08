var React = require("react");

function FooterLayout(props) {
  return (
    <footer className="main-footer">
      <strong>
        Copyright &copy; 2014-2021 <a href="https://md.akhi.ir">Md.Akhi.ir</a>.
      </strong>
      All rights reserved.
      <div className="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.1.0
      </div>
    </footer>
  );
}

module.exports = FooterLayout;
