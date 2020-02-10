const path = require("path");
const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const bodyParser = require("body-parser");
const cors = require("cors");

const carBrandRouter = require("./routes/carBrandRoutes");
// const packageRouter = require("./routes/packagesRoutes");
const bookingRouter = require("./routes/coustmerInforRoutes");
const viewRouter = require("./routes/viewRoutes");
const csvUpload = require("./routes/csvUploadRoutes");
const app = express();

var cons = require("consolidate");

app.engine("html", cons.swig);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
// app.use.static("static");

// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "developement") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header('Access-Control-Allow-Headers', '*');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    req.header(
      "Access-Control-Allow-Methods",
      "POST, POST, PATCH, DELETE, GET"
    );
    return res.status(200).json({});
  }
  next();
});

var whitelist = [
  "http://www.mechmycar.com/api/v1/carbrand",
  "http://www.mechmycar.com/api/v1/booking",
  "http://www.mechmycar.com",
  "http://mechmycar.com/",
  "http://mechmycar.com/api/v1/carbrand",
  "http://mechmycar.com/api/v1/booking"
];

var corsOptionsDelegate = function(req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }

  callback(null, corsOptions);
};

app.use("/", viewRouter);
app.use("/api/v1/carBrand", cors(corsOptionsDelegate), carBrandRouter);
app.use("/api/v1/booking", cors(corsOptionsDelegate), bookingRouter);
app.use("/csvUpload", csvUpload);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
