const CoustmerInfo = require('../models/coustmerInfoModel');
const catchAsync = require('../utils/catchAsync');


exports.createcoustmerInfo = catchAsync(async (req, res, next) => {
    const newCoustmerInfo = await CoustmerInfo.create(req.body);


    res.status(201).json({
        status: 'success',
        data: {
            data: newCoustmerInfo
        }
    })
});

exports.getallcoustmerInfo = catchAsync(async(req, res, next) => {
    const coustmerInfo = await CoustmerInfo.find();

    res.status(200).json({
        status: "success",
        results: coustmerInfo.length,
        data: {
            coustmerInfo
        }
    })
});