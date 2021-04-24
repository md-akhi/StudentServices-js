const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const reactViews = require("express-react-views");
const fs = require("fs");
const path = require("path");
const logger = require("morgan");
const multer = require("multer");
const randomstring = require("randomstring");

const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/studentServices", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });
const db = mongoose.connection;


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// setup the logger
app.use(logger("dev"));

//set static dir
app.use(express.static(path.join(__dirname, "public")));

app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());

app.set("trust proxy", 1);
app.use(
  session({
    secret: randomstring.generate(),
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
      secure: true,
      expires: new Date(Date.now() + 60000),
    },
  })
);

//routers
app.get("/", function (req, res) {
  res.render("home", { name: "student Services", title: "Student Services" });
});
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
