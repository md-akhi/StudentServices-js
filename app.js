import Express from "express";
import Path from "path";
import reactViews from "express-react-views";
import { fileURLToPath } from "url";
import ConfigExpress from "./config/express.js";
import Routes from "./routes/index.js";
import APIRoutes from "./api/routes/index.js";

const __dirname = Path.dirname(fileURLToPath(import.meta.url));

let App = Express();

let infoApp = {};

//set static dir
App.use(Express.static(Path.join(__dirname, "public")));

// set views Path, template engine and default layout
App.set("views", __dirname + "/views");
App.set("view engine", "jsx");
App.engine("jsx", reactViews.createEngine());
//App.use(favicon(__dirname + '/public/favicon.png'));

//config
App = ConfigExpress(App, infoApp);

// Routes
App.use("/api", APIRoutes());
App.use("/", Routes(infoApp));
