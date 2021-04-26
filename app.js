
const express = require("express");
const path = require("path");
const reactViews = require("express-react-views");
const app = express();

let ssen = {user: false};

//set static dir
app.use(express.static(path.join(__dirname, "public")));

// set views path, template engine and default layout
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());

//routers
require("./config/expers")(app, ssen);
require("./routes/home")(app, ssen);
require("./routes/auth")(app, ssen);
require("./routes/dashboard")(app, ssen);

module.exports = app;
