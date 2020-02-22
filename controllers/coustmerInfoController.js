const CoustmerInfo = require("../models/coustmerInfoModel");
const carBrand = require("../models/carBrandModel");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/mail");

exports.createcoustmerInfo = catchAsync(async (req, res, next) => {
  const newCoustmerInfo = await CoustmerInfo.create(req.body);
  const modelFilter = await carBrand.findOne({ Model: req.body.slugholder });
  const message = `Your Booking has been successfully recived! you will receive our response from our team 
  your booking deatils:
  Your Booking id: ${newCoustmerInfo.id}
  name: ${newCoustmerInfo.name}
  phone: ${newCoustmerInfo.phone}
  YourModel: ${modelFilter.Model}
  package Type: ${req.body.packageType}
  price: ${req.body.price}
  `;
  const html = `<h2 style="color:blue;">Your Booking has been successfully recived! you will receive our response from our team</h2><hr>
  <h3>Your Booking Deatils:-<h3>
  <h4>Your Booking id: ${newCoustmerInfo.id}</h4>
  <h4>Name: ${newCoustmerInfo.name}</h4>
  <h4>Phone: ${newCoustmerInfo.phone}</h4>
  <h4>YourModel: ${modelFilter.Model}</h4>
  <h4>Package Type: ${req.body.packageType}</h4>
  <hr>
  <h3>Price: ${req.body.price}</h3>
  `;

  try {
    await sendEmail({
      email: [`${newCoustmerInfo.email}`, "ambienceautos@gmail.com"],
      subject: "MechMyCar.com",
      // message: message,
      html: `${html}`
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
