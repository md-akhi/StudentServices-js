
const express = require("express");
const path = require("path");
const reactViews = require("express-react-views");

const app = express();

let ssen = {
  user: false,
  expires: Date.now() + 7 * 24 * 60 * 60,
  dir: {}
};

//set static dir
app.use(express.static(path.join(__dirname, "public")));

// set views path, template engine and default layout
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());

//config
require("./config/expers")(app, ssen);

// routes
require("./routes/index")(app, ssen);

module.exports = app;
