require("dotenv").config();
let session = require("express-session");
let MongoStore = require("connect-mongo");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let cors = require("cors");
//let fs = require("fs");
//let path = require("path");
let logger = require("morgan");
//let multer = require("multer");
let compression = require("compression");

const pkg = require("../package.json");
const env = process.env;
const mode = env.NODE_ENV || "development";
const port = env.PORT || 3000;

module.exports = function (app, infoApp) {
  let mongoose = require("./db.js")(env);

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  // setup the logger
  // Don't log during tests
  // Logging middleware
  if (mode !== "test") app.use(logger("dev"));

  // Compression middleware (should be placed before express.static)
  app.use(compression());

  //if (app.get("env") === "production") {
  app.set("trust proxy", 1);
  let sessionStore = MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017/studentServices",
  });
  app.use(
    session({
      secret: pkg.name,
      resave: true,
      saveUninitialized: true,
      cookie: {
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60),
      },
      store: sessionStore,
    })
  );
  //}

  // expose package.json to views
  app.use(function (req, res, next) {
    if (infoApp.session === undefined) {
      infoApp.session = req.session;
      infoApp.session.login = false;
    }
    //else req.session = infoApp.session;
    next();
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};
