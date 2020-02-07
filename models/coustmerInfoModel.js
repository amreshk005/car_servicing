const mongoose = require("mongoose");
const validator = require("validator");

const coustmerInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"]
  },
  phone: {
    type: String,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  pinCode: {
    type: Number,
    required: true
  }
});

const CoustmerInfo = mongoose.model("CoustmerInfo", coustmerInfoSchema);

module.exports = CoustmerInfo;
