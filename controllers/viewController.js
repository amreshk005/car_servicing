const carBrand = require('../models/carBrandModel');
const Booking = require('../models/coustmerInfoModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
    const cars = await carBrand.find(req.body.CarMake);
    

    res.status(200).render('index', {
        title: 'Car care',
        cars
    })
})

exports.getPackage = catchAsync(async (req, res, next) => {

    const package = await carBrand.findOne({ slug: req.params.slug });

    res.status(200).render('pricing', {
        title: 'package for model',
        package
    });
});

exports.getBooking = catchAsync(async(req, res, next) => {
    res.status(200).render('booking', {
        title: 'Log into your account'
      });
})

exports.createBooking = catchAsync(async (req, res, next) => {
    const saveBooking = await Booking.create(req.body)

    res.status(201).redirect('/')
})