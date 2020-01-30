const carBrand = require("../models/carBrandModel");
const AppErrror = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllManufacturers = catchAsync(async (req, res, next) => {
    const manufacturers = await carBrand.find()

    res.status(200).json({
        status: "success",
        results: manufacturers.length,
        data: {
            manufacturers
        }
    })
})

exports.addManufacturer = catchAsync(async (req, res, next) => {
    
    const newManufacturer =  await carBrand.create(req.body)

    res.status(201).json({
        status: "success",
        data: {
            Manufacturer: newManufacturer
        }
    })
})