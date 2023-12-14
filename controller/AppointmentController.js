





const appointment = require("../models/appointment");

const getAppointment = async (req, res) => {
  const times = [
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "1:00",
    "1:30",
  ];

  res.render("appointment", { timeSlotList: times });
};

const getAppointmentByDate = async (req, res) => {
  var requestDate = req.query.dateSlot;
  if (!requestDate) {
    requestDate = Date.now();
  }

  const slots = await appointment.find({
    date: requestDate,
  });

  if (!slots || slots == undefined) {
    slots = new appointment();
  }

  res.end(JSON.stringify(slots, null, 3));
};

const availAppointment = async (req, res) => {
  console.log(req.body);
  await appointment.create({
    date: req.body.dateSlot,
    time: req.body.timeSlot,
    isTimeSlotAvailable: true,
  });
  res.redirect("/Appointment");
};

module.exports = { getAppointment, availAppointment, getAppointmentByDate };
