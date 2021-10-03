import express from "express";
import path from "path";
import reactViews from "express-react-views";
import { fileURLToPath } from "url";
import configExpress from "./config/express.js";
import routes from "./routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
app = configExpress(app, infoApp);

// routes
app.use("/", routes(infoApp));
