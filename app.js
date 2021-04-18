const express = require("express");
const path = require("path");
var morgan = require("morgan");
var fs = require("fs");
var reactViews = require("express-react-views");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/index");
var indexRouter = require("./routes/index");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// setup the logger
app.use(morgan("dev", { stream: fs.createWriteStream(path.join(__dirname, "access.log"), {flags: "a"}) }));

//set static dir
app.use(express.static(path.join(__dirname, "public")));

app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactViews.createEngine());

//routers
app.use("/", indexRouter);

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500).json(err);
});

const port = 9000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
