const Express = require("express");
const path = require("path");
const reactViews = require("express-react-views");

let App = Express();

let infoApp = {};

//set static dir
App.use(Express.static(path.join(__dirname, "public")));

// set views path, template engine and default layout
App.set("views", __dirname + "/views");
App.set("view engine", "jsx");
App.engine("jsx", reactViews.createEngine());
//App.use(favicon(__dirname + '/public/favicon.png'));

//config
require("./config/expers")(App, infoApp);

// routes
let routes = require("./index")(infoApp);
App.use("/", routes);

module.exports = App;
