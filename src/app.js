import Express from "express";
import Path from "path";
//import ReactViews from "express-react-views";
import { fileURLToPath } from "url";
import ConfigExpress from "./config/express.js";
import Routes from "./routes/index.js";
import APIRoutes from "./api/routes/index.js";

//const __dirname = Path.dirname(fileURLToPath(import.meta.url));
export default () => {
	let App = Express();

	let infoApp = {};

	//set static dir
	App.use(Express.static(Path.resolve(__dirname, "public")));

	// set views Path, template engine and default layout
	App.set("views", Path.resolve(__dirname, "public", "pages"));
	App.set("view engine", "ejs");
	//App.use(favicon(__dirname + '/public/favicon.png'));

	//config
	App = ConfigExpress(App, infoApp);

	// Routes
	App.use("/api", APIRoutes());
	App.use("/", Routes(infoApp));

	return App;
};
