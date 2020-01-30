const Package = require('../models/packageModel');
const catchAsync = require('../utils/catchAsync');


exports.getAllPackages = catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    const packages = await Package.find(filter);

    res.status(200).json({
        status: 'success',
        results: packages.length,
        data: {
            data: packages
        }
    })
})
exports.createPackage = catchAsync(async (req, res, next) => {
    const newPackage = await Package.create(req.body);

    
    res.status(201).json({
        status: 'success',
        data: {
            data: newPackage
        }
    })

})