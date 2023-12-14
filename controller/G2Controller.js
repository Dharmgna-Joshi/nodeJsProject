



const personalDetails = require("../models/personalDetails");
const appointment = require("../models/appointment");

const getG2 = async (req, res) => {
  const personalDetail = await personalDetails.findById(loggedIn);
  let error;
  if (personalDetail && personalDetail.licenceNo) {
    if (personalDetail.testType == "G") {
      error = "You have already clear G2";
    }
    personalDetail.testType = "G2";
    const timeSlot = await appointment.findById(personalDetail.appointmentId);
    res.render("g2", {
      error: error,
      personalDetail: personalDetail,
      timeSlot: timeSlot,
    });
  } else {
    let personalDetailsPass = new personalDetails();
    personalDetailsPass.testType = "G2";
    console.log(personalDetailsPass);
    res.render("g2", {
      personalDetail: personalDetailsPass,
      timeSlot: undefined,
    });
  }
};

const getG2ByLicenceNo = async (req, res) => {
  const personalDetail = await personalDetails.find({
    licenceNo: req.params.licenceNo,
  });
  res.render("g2", {
    personalDetail,
  });
};

const saveUserDetails = async (req, res) => {
  console.log(req.body);
  await personalDetails.findByIdAndUpdate(loggedIn, {
    ...req.body,
    appointmentId: req.body.timeSlot,
    car_details: {
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      plat_number: req.body.plat_number,
    },
  });

  await appointment.findByIdAndUpdate(
    { _id: req.body.timeSlot },
    {
      isTimeSlotAvailable: false,
    }
  );
  res.redirect("/");
};

const getAvailSlots = async (req, res) => {
  const data = await appointment.find({
    date: req.query.dateSlot,
    isTimeSlotAvailable: true,
  });
  res.end(JSON.stringify(data, null, 3));
};

module.exports = { getG2, getG2ByLicenceNo, saveUserDetails, getAvailSlots };
