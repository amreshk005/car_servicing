const path = require("path");
const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const bodyParser = require("body-parser");

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

app.use("/", viewRouter);
app.use("/api/v1/carBrand", carBrandRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/csvUpload", csvUpload);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
