const { response, request } = require("express");
const Reservation = require("../models/reservation");
const sgMAIL = require('@sendgrid/mail'); 
const cron = require('node-cron')
const shell = require("shelljs")

const reservationPost = async (req, res ) => {
    const reservations = new Reservation({
        email: req.body.email,
        product: req.body.product,
        startTime: req.body.startTime,
        endTime: req.body.endTime
       
    });
    reservations.save().then(result => { 
        res.status(201).json({
            email: result.email,
            product: result.product,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        });
        cron.schedule('1 0 2 11 Noveember Thu', () => {
            const message = {
                to: req.body.email,
                from: 'lauraq2348@gmail.com',
                subject: 'Reservation',
                text: 'Remember the time for your reservation',
            };

            sgMAIL.send(message)
            .then(response => console.log('Email sent...'))
            .catch(error => console.log('couldnt sent'));
        }, {
            timezone: 'America/Caracas',
        })
    }).catch(err => {
        res.status(404).json({
            error: err
        });
    });    
};

const reservationDelete = async(req, res = response) => {
    const { id } = req.params;
    await Reservation.findByIdAndDelete( id, { status: false } );
    res.status(200).json({
        message: 'reservation deleted',
    });
};

const reservationGet = async(req = request, res = response) => {
    const id = req.params.id;

    Reservation.findOne({ _id: id })
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json({
                    user: doc,
                });
            } else {
                res.status(404).json({message: "reservation not found"});
            }
        });
};

const reservationPut = async(req, res = response) => {
    const id = req.params.id;

    const updateOps = {
        email: req.body.email,
        product: req.body.product,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
    };

    Reservation.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'reservation updated',
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });

};


module.exports = {
    reservationPost,
    reservationGet,
    reservationPut,
    reservationDelete,
    
}