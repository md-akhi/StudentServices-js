var React = require("react");

function PreLoader(props) {
  return (
    <div class="preloader flex-column justify-content-center align-items-center">
      {/* Preloader */}
      <img
        class="animation__shake"
        src="dist/img/AdminLTELogo.png"
        alt="AdminLTELogo"
        height="60"
        width="60"
      />
    </div>
  );
}

module.exports = PreLoader;
