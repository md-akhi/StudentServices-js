const { template, path } = require("../config/static");
module.exports = function (infoApp) {
  // middleware function
  const Mid = require("../controllers/middleware")(infoApp);
  // middleware function to check for logged-in users
  let dir = infoApp.direction;
  return {
    getRoot: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CDashboard(), { name: "dashboard" });
      },
    ],
  };
};
