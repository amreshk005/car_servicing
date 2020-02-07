const mongoose = require("mongoose");
const Package = require("./packageModel");
const slugify = require("slugify");

const carBrandSchema = new mongoose.Schema(
  {
    CarMake: {
      type: String,
      required: [true, "A Manufacturer must have a name"],
      trim: true,
      maxlength: [
        40,
        "A Manufacturer name must have less or equal to 40 characters"
      ],
      minlength: [
        2,
        "A Manufacturer name must have more or equal to 2 characters"
      ]
    },
    slug: String,
    Model: {
      type: String,
      required: [true, "A Model name manufacturer must have Model name"],
      trim: true,
      maxlength: [40, "A Model must be smaller or less than 40 words"],
      minlength: [2, "A Model must be greater than 2 words of manugacturer"]
    },
    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "CNG", null],
      required: true
    },
    packages: [
      {
        packageType: {
          type: String,
          length: [10, "A packagae type has length of 10"],
          required: true,
          unique: true
        },
        price: {
          type: Number,
          required: true
        },
        checkingTime: {
          type: Number
        },
        services: []
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

carBrandSchema.pre("save", function(next) {
  this.slug = slugify(this.CarMake, { lower: true });
  next();
});

const carBrand = mongoose.model("carBrand", carBrandSchema);

module.exports = carBrand;
