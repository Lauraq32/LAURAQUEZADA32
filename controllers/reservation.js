const { response, request } = require("express");
const Reservation = require("../models/reservation");
const sgMAIL = require("@sendgrid/mail");
const schedule = require("node-schedule");
const moment = require("moment");

const reservationPost = async (req, res) => {
  const startTime = moment(req.body.startTime).add(4, "hours").toDate();
  const endTime = moment(req.body.endTime).add(4, "hours").toDate();

  console.log(
    `startTime: ${moment(startTime).toDate()} 
    endTime: ${moment(endTime).toDate()}`
  );

  const reservations = new Reservation({
    email: req.body.email,
    startTime: startTime,
    endTime: endTime,
  });
  reservations
    .save()
    .then(async (result) => {
      const date = moment(startTime).subtract(1, "hour").toDate();
      console.log(`scheduled date: ${date}`);
      console.log(`current date: ${moment().toDate()}`);

      const duration = moment.duration(
        moment(startTime).diff(moment())
      );
      const difference = duration.asMinutes();

      const message = {
        to: req.body.email,
        from: "lauraq2348@gmail.com",
        subject: "Reservation remainder",
        text: "Remenber the time for your reservation",
      };

      if (difference > 60) {
        schedule.scheduleJob(date, async () => {
          await sendEmail(message);
        });
      } 
      res.status(201).json({
        email: result.email,
        startTime: startTime,
        endTime: endTime,
      });
    })
    .catch((err) => {
      console.log(`an error occurred ${err}`);
      res.status(404).json({
        error: err,
      });
    });
};
const sendEmail = async (message) => {
  try {
    await sgMAIL.send(message);
    console.log("email successfully sent");
  } catch (error) {
    console.log(`error sending email ${error}`);
  }
};

const reservationDelete = async (req, res = response) => {
  const { id } = req.params;
  await Reservation.findByIdAndDelete(id, { status: false });
  res.status(200).json({
    message: "reservation deleted",
  });
};

const reservationGet = async (req = request, res = response) => {
  const id = req.params.id;

  Reservation.findOne({ _id: id }).then((doc) => {
    console.log("from database", doc);
    if (doc) {
      res.status(200).json({
        reservation: doc,
      });
    } else {
      res.status(404).json({ message: "reservation not found" });
    }
  });
};

const reservationPut = async (req, res = response) => {
  const id = req.params.id;

  const updateOps = {
    email: req.body.email,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
  };

  
  Reservation.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "reservation updated",
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};

module.exports = {
  reservationPost,
  reservationGet,
  reservationPut,
  reservationDelete,
};