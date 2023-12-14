




const personalDetails = require("../models/personalDetails");
const appointment = require("../models/appointment");

const getExaminer = async (req, res) => {
  res.render("examiner");
};

const getExaminerList = async (req, res) => {
  let examType = [];
  console.log(req.query);
  if (req.query.type != "undefined") {
    console.log("1");
    examType.push(req.query.type);
  } else {
    console.log("2");
    examType = ["G2", "G"];
  }
  console.log(examType);
  const personalDetail = await personalDetails.aggregate([
    {
      $lookup: {
        from: "appointments",
        localField: "appointmentId",
        foreignField: "_id",
        as: "appointment",
      },
    },
    {
      $match: {
        appointmentId: { $ne: undefined },
        testType: { $in: examType },
      },
    },
  ]);
  res.end(JSON.stringify(personalDetail, null, 3));
};

const getDriverDetails = async (req, res) => {
  const personalDetail = await personalDetails.findById(req.query.id);
  res.end(JSON.stringify(personalDetail, null, 3));
};

const updateDriverStatus = async (req, res) => {
  console.log(req.body);
  await personalDetails.findByIdAndUpdate(req.body.id, {
    comments: req.body.comment,
    pass: req.body.pass,
  });
  res.end("Update Successfully");
};

const driverStatus = async (req, res) => {
  res.render("adminView");
};

const getDriverStatus = async (req, res) => {
  let personalDetail;
  if (req.query.pass == "undefined") {
    console.log("1");
    personalDetail = await personalDetails.find({ usertype: "Driver" });
  } else {
    console.log("2");
    personalDetail = await personalDetails.find({
      usertype: "Driver",
      pass: req.query.pass,
    });
  }
  res.end(JSON.stringify(personalDetail, null, 3));
};

module.exports = {
  getExaminerList,
  getExaminer,
  getDriverDetails,
  updateDriverStatus,
  getDriverStatus,
  driverStatus,
};
