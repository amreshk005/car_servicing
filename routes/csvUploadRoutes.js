const express = require("express");
const csvUploadController = require("../controllers/csvUploadController");

const router = express.Router();

router
  .route("/")
  .post(csvUploadController.uploadFile, csvUploadController.uploadCsv);

module.exports = router;
