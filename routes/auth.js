const Users = require("../models/user");

module.exports = function(app, ssen) {

const Auth = require("../controllers/auth")(ssen);
//var { check } = require("express-validator");

let dirAuth = "/auth";
let dirCustomer = "customer";

// root
app.get(dirAuth, Auth.get_auth);

app
  .route([dirAuth + "/signup", dirAuth + "/register"])
  .get(Auth.get_signup)
  .post(Auth.post_signup);

app
  .route([dirAuth + "/login", dirAuth + "/signin"])
  .get(Auth.get_login)
  .post(Auth.post_login);

app.get(dirAuth + "/logout", Auth.get_logout);

};
