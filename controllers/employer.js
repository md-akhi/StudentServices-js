
module.exports = function(ssen) {

  let dirEmployer = "/employer";
  let dirCustomer = "customer";

  // middleware function
  const Mid = require("../controllers/middleware")(ssen);
  // middleware function to check for logged-in users
  return {

    get_employer: [
      Mid.logInChecker,
      function (req, res) {
        res.render(dirCustomer + dirDashboard + "/employer", { name: "employer" });
      }
    ],



    };
};
