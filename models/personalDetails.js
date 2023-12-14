





const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const personalDetailsSchema = new Schema({
  firstName: String,
  lastName: String,
  licenceNo: String,
  age: Number,
  dob: String,
  username: String,
  password: String,
  usertype: String,
  appointmentId: Schema.ObjectId,
  testType: String,
  comments: String,
  pass: { type: Boolean, default: false },
  car_details: {
    make: String,
    model: String,
    year: Number,
    plat_number: String,
  },
});

personalDetailsSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

personalDetailsSchema.pre("update", function (next) {
  const user = this;
  bcrypt.hash(user.licenceNo, 10, (error, hash) => {
    user.licenceNo = hash;
    next();
  });
});


const personalDetails = mongoose.model(
  "personalDetails",
  personalDetailsSchema
);


module.exports = personalDetails;
