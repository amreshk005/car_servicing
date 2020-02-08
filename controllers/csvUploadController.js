const catchAsync = require("../utils/catchAsync");
const http = require("http");
const csv = require("fast-csv");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

var upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "../data/csv");
    }
    // filename: function(req, file, cb) {
    //   cb(null, file. + "-" + Date.now());
    // }
  })
});

exports.uploadFile = () => {
  upload.single("file", "_id");
};

exports.uploadCsv = catchAsync(async (req, res, next) => {
  const fileRows = [];

  csv
    .fromPath(req.file.path)
    .on("data", function(data) {
      fileRows.push(data);
    })
    .on("end", function() {
      console.log(fileRows);
      fs.unlinkSync(req.file.path);
    });
});
