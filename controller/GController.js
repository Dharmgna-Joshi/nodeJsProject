




const personalDetails = require("../models/personalDetails");
const appointment = require("../models/appointment");

const getG = (req, res) => {
  res.render("g");
};

const getUserDetails = async (req, res) => {
  const personalDetail = await personalDetails.findById(loggedIn);
  if (personalDetail && personalDetail.licenceNo) {
    let timeSlot = undefined;
    let error;
    if (personalDetail.testType == "G2") {
      personalDetail.testType = "G";
      if (!personalDetail.pass) {
        console.log("2");
        error = "You haven't passed G2 yet";
        //res.render("g2", { error:  });
      }
    } else {
      console.log("4");
      timeSlot = await appointment.findById(personalDetail.appointmentId);
    }
    res.render("g2", {
      error: error,
      personalDetail: personalDetail,
      timeSlot: timeSlot,
    });
  } else {
    let personalDetailsPass = new personalDetails();
    personalDetailsPass.testType = "G";
    res.render("g2", {
      personalDetail: personalDetailsPass,
      timeSlot: undefined,
    });
  }
};

const updateUserInfo = async (req, res) => {
  await personalDetails.findOneAndUpdate(
    { licenceNo: req.body.licenceNo },
    {
      car_details: {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        plat_number: req.body.plat_number,
      },
    }
  );
  getUserDetails(req, res);
};

module.exports = { getG, getUserDetails, updateUserInfo };
