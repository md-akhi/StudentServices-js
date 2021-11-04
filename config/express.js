import dotenv from "dotenv";
import session from "express-session"; //deprecated
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
//import path from "path";
import logger from "morgan";
//import multer from "multer";
import compression from "compression";
import { v5 as uuidv5 } from "uuid";
import mongoose from "./db.js";

// Use fs.readFile() method to read the file
let pkg = JSON.parse(fs.readFileSync("./package.json"));

dotenv.config();
const env = process.env;

export default function (app, infoApp) {
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cors());

	// setup the logger
	// Don't log during tests
	// Logging middleware
	if (env.NODE_ENV !== "test") app.use(logger("dev"));

	// Compression middleware (should be placed before express.static)
	app.use(compression());

	mongoose(env);

	//if (app.get("env") === "production") {
	app.set("trust proxy", 1);

	app.use(
		session({
			secret: uuidv5(pkg.name, uuidv5.URL),
			resave: true,
			saveUninitialized: true,
			cookie: {
				path: "/",
				maxAge: 7 * 24 * 60 * 60,
				secure: true,
				expires: new Date(Date.now() + 7 * 24 * 60 * 60),
			},
			store: MongoStore.create({
				mongoUrl: env.MONGODB_URL + env.DB_NAME,
			}),
		})
	);
	//}

	// expose package.json to views
	app.use(function (req, res, next) {
		if (infoApp.session === undefined) {
			infoApp.session = req.session;
			infoApp.session.login = false;
		}
		req.env = env;
		req.pkg = pkg;
		//else req.session = infoApp.session;
		next();
	});

	app.listen(env.PORT, () => {
		console.log(`Server running on http://localhost:${env.PORT}`);
	});

	return app;
}
