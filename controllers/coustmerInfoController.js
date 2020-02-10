const CoustmerInfo = require("../models/coustmerInfoModel");
const carBrand = require("../models/carBrandModel");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/mail");

exports.createcoustmerInfo = catchAsync(async (req, res, next) => {
  const newCoustmerInfo = await CoustmerInfo.create(req.body);
  const modelFilter = await carBrand.findOne({ Model: req.body.slugholder });
  const message = `Your Booking has been successfully recived! you will recive our response from our team 🧨
  your booking deatils:
  Your Booking id: ${newCoustmerInfo.id}
  name: ${newCoustmerInfo.name}
  phone: ${newCoustmerInfo.phone}
  YourModel: ${modelFilter.Model}
  package Type: ${req.body.packageType}
  price: ${req.body.price}
  `;
  try {
    await sendEmail({
      email: [`${newCoustmerInfo.email}`, "zaidforalam424@gmail.com"],
      subject:
        "Your Booking has been successfully recived! you will recive our response from our team 🧨",
      message: message
    });
    res.status(201).json({
      status: "success",
      message: "Booking detail sent to email"
    });
  } catch (err) {
    alert(err, "there was an error sending the email. try again later!");
    return next(
      new AppError("there was an error sending the email. try again later!"),
      500
    );
  }
  console.log("message sent");
});

exports.getallcoustmerInfo = catchAsync(async (req, res, next) => {
  const coustmerInfo = await CoustmerInfo.find();

  res.status(200).json({
    status: "success",
    results: coustmerInfo.length,
    data: {
      coustmerInfo
    }
  });
});
