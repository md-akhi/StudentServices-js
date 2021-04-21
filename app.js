const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var morgan = require("morgan");
var fs = require("fs");
var reactViews = require("express-react-views");
const bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var multer = require("multer");
const cors = require("cors");
var indexRouter = require("./routes/index");
var sesion;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/studentServices", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });
const db = mongoose.connection;

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// setup the logger
app.use(morgan("dev"));

//set static dir
app.use(express.static(path.join(__dirname, "public")));

app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
      secure: true,
      expires: new Date(Date.now() + 60000),
    },
  })
);

//routers
app.get('/',function(req,res){
 res.render("home", { name: "student Services", title: "Student Services" });
});
app.use("/", indexRouter);

const port = 9000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
