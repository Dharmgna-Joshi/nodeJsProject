//Packages
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const personalDetails = require("./models/personalDetails");
const { Console } = require("console");
const bp = require("body-parser");
const expressSession = require("express-session");

//Controllers
const gController = require("./controller/GController");
const g2Controller = require("./controller/G2Controller");
const dashboardController = require("./controller/DashboardController");
const loginController = require("./controller/LoginController");
const appointmentController = require("./controller/AppointmentController");
const examinerController = require("./controller/ExaminerController");

//connecting to the db
mongoose.connect(
  "mongodb+srv://dharmgnajoshi131199:Dharmgna13@driving-test-data-db.zo7i3bj.mongodb.net/"
);
const db = mongoose.connection
db.on('error', (err) => {
  console.log(err)
})
db.once('open', () => {
  console.log("Database Connection Established")
})
//FUnction
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//Middleware
const authMiddleware = require("./middleware/authMiddleware");
app.use(
  expressSession({
    secret: "session are best",
  })
);

//For static files
app.use(express.static("public"));

app.listen(4000, () => {
  console.log("App is ready at port 4000");
});

//control the navigation links
global.loggedIn = null;
global.userType = null;

app.use("*", (req, res, next) => {
  global.loggedIn = req.session.userId;
  global.userType = req.session.userType;
  next();
});

//Routes
app.get("/", dashboardController.getDashboard);

app.get("/Dashboard", dashboardController.getDashboard);

app.get("/G", authMiddleware.checkLoginAtOtherPage, gController.getUserDetails);

app.post(
  "/G",
  authMiddleware.checkLoginAtOtherPage,
  gController.getUserDetails
);

app.get("/G2", authMiddleware.checkLoginAtOtherPage, g2Controller.getG2);

app.get(
  "/G2/:licenceNo",
  authMiddleware.checkLoginAtOtherPage,
  g2Controller.getG2ByLicenceNo
);

app.post(
  "/G2",
  authMiddleware.checkLoginAtOtherPage,
  g2Controller.saveUserDetails
);

app.get(
  "/GetAvailSlotsForBook",
  authMiddleware.checkLoginAtOtherPage,
  g2Controller.getAvailSlots
);

app.get(
  "/Appointment",
  authMiddleware.checkLoginAtOtherPage,
  appointmentController.getAppointment
);

app.post(
  "/AvailAppointment",
  authMiddleware.checkLoginAtOtherPage,
  appointmentController.availAppointment
);

app.get(
  "/AppointmentByDate",
  authMiddleware.checkLoginAtOtherPage,
  appointmentController.getAppointmentByDate
);

app.get(
  "/DriverStatus",
  authMiddleware.checkLoginAtOtherPage,
  examinerController.driverStatus
);

app.get(
  "/GetDriverStatus",
  authMiddleware.checkLoginAtOtherPage,
  examinerController.getDriverStatus
);

app.get("/Login", authMiddleware.checkGetLogin, loginController.getLogin);

app.post(
  "/AuthenticateUser",
  authMiddleware.checkGetLogin,
  loginController.authenticateUser
);

app.post(
  "/GUpdate",
  authMiddleware.checkLoginAtOtherPage,
  gController.updateUserInfo
);

app.post(
  "/SaveLogin",
  authMiddleware.checkGetLogin,
  loginController.saveLoginDetails
);

app.get(
  "/Examiner",
  authMiddleware.checkLoginAtOtherPage,
  examinerController.getExaminer
);

app.get(
  "/ExaminerList",
  authMiddleware.checkLoginAtOtherPage,
  examinerController.getExaminerList
);

app.get(
  "/DriverDetails",
  authMiddleware.checkLoginAtOtherPage,
  examinerController.getDriverDetails
);

app.post(
  "/UpdateDriverStatus",
  authMiddleware.checkLoginAtOtherPage,
  examinerController.updateDriverStatus
);

app.get("/Logout", loginController.logout);
