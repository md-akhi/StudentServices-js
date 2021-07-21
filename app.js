const express = require("express");
const path = require("path");
const reactViews = require("express-react-views");

const app = express();

let infoApp = {
  direction: {
    // path
    auth: "/auth",
    customer: "customer",
    dashboard: "/dashboard",
    employer: "/employer",
    frelanser: "/frelanser",
    // template
    tAuth: "/auth",
    tCustomer: "customer",
    tDashboard: "/dashboard",
    tEmployer: "/employer",
    tFrelanser: "/frelanser",
  },
};

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
