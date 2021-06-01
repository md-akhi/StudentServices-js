module.exports = function(app, ssen) {

//router
require("./home")(app, ssen);
require("./auth")(app, ssen);
require("./dashboard")(app, ssen);

};
