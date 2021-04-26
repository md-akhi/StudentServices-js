
require('dotenv').config();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const mongoStore = require('connect-mongo');
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const logger = require("morgan");
const multer = require("multer");
const compression = require('compression');


const pkg = require('../package.json');
const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

//mongoDB
const dbUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/studentServices';
mongoose.Promise = global.Promise;
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });
const db = mongoose.connection;


module.exports = function(app, ssen) {

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// setup the logger
// Don't log during tests
// Logging middleware
if (env !== 'test')
  app.use(logger("dev"));

// Compression middleware (should be placed before express.static)
app.use(compression());

// expose package.json to views
app.use(function(req, res, next) {
  res.locals.pkg = pkg;
  res.locals.env = env;
  next();
});

app.set("trust proxy", 1);
app.use(
  session({
    secret: pkg.name,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1 * 24 * 60 * 60,
      secure: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60),
    }
  })
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

};
