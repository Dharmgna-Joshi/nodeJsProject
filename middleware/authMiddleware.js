





const User = require("../models/personalDetails");
const checkLoginAtOtherPage = (req, res, next) => {
  if (!loggedIn) {
    return res.redirect("/login");
  } else if (
    ["/G2", "/G", "/GUpdate", "/GetAvailSlotsForBook"].includes(req.path) ==
      false &&
    userType == "Driver"
  ) {
    return res.redirect("/Dashboard");
  } else if (
    [
      "/Appointment",
      "/Saveappointment",
      "/AppointmentByDate",
      "/AvailAppointment",
      "/DriverStatus",
      "/GetDriverStatus",
    ].includes(req.path) == false &&
    userType == "Admin"
  ) {
    return res.redirect("/Dashboard");
  } else if (
    [
      "/Examiner",
      "/ExaminerList",
      "/DriverDetails",
      "/UpdateDriverStatus",
    ].includes(req.path) == false &&
    userType == "Examiner"
  ) {
    return res.redirect("/Dashboard");
  }
  next();
};

const checkGetLogin = (req, res, next) => {
  if (loggedIn) {
    return res.redirect("/");
  }
  next();
};

module.exports = { checkLoginAtOtherPage, checkGetLogin };
