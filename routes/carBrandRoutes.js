const express = require("express");
const carBrandController = require("../controllers/carBrandController");

const router = express.Router();

router
    .route("/")
    .get(carBrandController.getAllManufacturers)
    .post(carBrandController.addManufacturer);


module.exports = router;
