const carBrand = require("../models/carBrandModel");
const Booking = require("../models/coustmerInfoModel");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/mail");

exports.getOverview = catchAsync(async (req, res, next) => {
  const cars = await carBrand.find();

  res.status(200).render("index", {
    title: "Car care",
    cars
  });
});

exports.getPackage = catchAsync(async (req, res, next) => {
  const packages = await carBrand.findOne({ slug: req.params.slug });

  res.status(200).render("pricing", {
    title: "package for model",
    packages
  });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const data = await req.body;
  console.log("data: " + data);
  res.status(200).render("booking", {
    title: "Log into your account"
  });
});

exports.createBooking = catchAsync(async (req, res, next) => {
  const saveBooking = await Booking.create(req.body);

  res.status(201).redirect("/");
});
