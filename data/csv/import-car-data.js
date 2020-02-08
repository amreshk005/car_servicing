const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const carBrand = require("../../models/carBrandModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB connection successfull!"));

const cars = JSON.parse(
  fs.readFileSync(`${__dirname}/go_mechanic.json`, "utf-8")
);

const importData = async () => {
  try {
    await carBrand.create(cars);
    console.log("DATA successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await carBrand.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
