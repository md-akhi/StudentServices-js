const express = require("express");
const path = require("path");
const reactViews = require("express-react-views");

let app = express();

let infoApp = {};

//set static dir
app.use(express.static(path.join(__dirname, "public")));

// set views path, template engine and default layout
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());
//app.use(favicon(__dirname + '/public/favicon.png'));

//config
require("./config/expers")(app, infoApp);

// routes
let routes = require("./routes/index")(infoApp);
app.use("/", routes);

module.exports = app;
