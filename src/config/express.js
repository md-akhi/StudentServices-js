import DotENV from "dotenv";
import Session from "express-session";
import MongoStore from "connect-mongo";
import CookieParser from "cookie-parser";
import BodyParser from "body-parser";
import Cors from "cors";
import FS from "fs";
//import path from "path";
import Logger from "morgan";
//import multer from "multer";
import Compression from "compression";
import { v5 as UID5, v4 as UID4 } from "uuid";
import DatabaseMongoDB from "./database.js";

// Use FS.readFile() method to read the file
const pkg = JSON.parse(FS.readFileSync("./package.json"));

DotENV.config();
const env = process.env;

export default function (App, infoApp) {
	App.use(CookieParser());
	App.use(BodyParser.json());
	App.use(BodyParser.urlencoded({ extended: true }));
	App.use(Cors());

	// setup the Logger
	// Don't log during tests
	// Logging middleware
	if (env.NODE_ENV !== "test") App.use(Logger("dev"));

	// Compression middleware (should be placed before express.static)
	App.use(Compression());

	DatabaseMongoDB(env);

	const SessionStore = MongoStore.create({
		mongoUrl: env.MONGODB_URL + env.DB_NAME,
	});
	const sessionUID = UID4();

	//if (App.get("env") === "production") {
	App.set("trust proxy", 1);
	App.use(
		Session({
			genid: () => sessionUID,
			name: "session",
			secret: UID5(pkg.name, UID5.URL),
			resave: true,
			saveUninitialized: true,
			cookie: {
				secure: true,
				path: "/",
				maxAge: 7 * 24 * 60 * 60, //+ 7 * 24 * 60 * 60 = 7 days
				expires: new Date(Date.now() + 7 * 24 * 60 * 60), //+ 7 * 24 * 60 * 60 = 7 days
			},
			store: SessionStore,
		})
	);
	//}

	// expose package.json to views
	App.use(function (req, res, next) {
		if (infoApp.session === undefined) {
			infoApp.sessionId = req.session.id;
			infoApp.session = req.session;
			infoApp.sessionStore = SessionStore;
			infoApp.user = {};
			infoApp.user.login = false;
		}
		req.env = env;
		req.pkg = pkg;
		next();
	});

	App.listen(env.PORT, () => {
		console.log(`Server running on http://localhost:${env.PORT}`);
	});

	return App;
}
