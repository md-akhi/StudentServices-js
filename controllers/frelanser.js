const Users = require("../models/user");
const Frelanser = require("../models/frelanser");
const { template, path } = require("../config/static");

module.exports = function (infoApp) {
  // middleware function
  const Mid = require("../controllers/middleware")(infoApp);

  // middleware function to check for logged-in users
  return {
    getRoot: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CFrelanser(), {
          name: "frelanser",
        });
      },
    ],

    getAddRequest: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CFrelanser(), {
          name: "frelanser",
        });
      },
    ],
    postAddRequest: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CFrelanser(), {
          name: "frelanser",
        });
      },
    ],

    getEditRequest: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CFrelanser(), {
          name: "frelanser",
        });
      },
    ],
    postEditRequest: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CFrelanser(), {
          name: "frelanser",
        });
      },
    ],

    getDelRequest: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CFrelanser(), {
          name: "frelanser",
        });
      },
    ],

    getProfile: [
      Mid.logInChecker,
      function (req, res) {
        res.render(template.CFrelanser() + "/profile", {
          name: "frelanser",
        });
      },
    ],
  };
};
