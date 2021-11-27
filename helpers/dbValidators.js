const User = require('../models/user');
const Reservation = require('../models/reservation');

const emailExists = async( email = '' ) => {
    const usedEmail = await User.findOne({ email });
    if (usedEmail) {
        throw new Error(`${ email }, is registered`);
    }
}

const user = async( id = '' ) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`id doesnt exists ${ id }`);
    }
}

const reservationExists = async( id = '' ) => {
    const reservationExists = await Reservation.findById(id);
    if (!reservationExists) {
        throw new Error(`id of reservation doesn't exists`);
    }
}

const Emailcheck = async( email = '' ) => {
     const reservationEmail = await Reservation.findOne({ email });
     if (reservationEmail) {
         throw new Error(`${ email }, is already registered`);
    }
 }

const reservationTimeExists = async( startTime = '' ) => {
    const startTimeExists = await Reservation.findOne({ startTime });
    if (startTimeExists) {
        throw new Error(`${ startTime }, this time slot is reserved, please try another time`);
    }
}

const checkendTime = async( endTime = '' ) => {
    const endTimeExists = await Reservation.findOne({ endTime });
    if (endTimeExists) {
        throw new Error(`${ endTime }, this time slot is almost over, please try another time`);
    }
}

module.exports = {
    emailExists,
    user,
    reservationExists,
    Emailcheck,
    reservationTimeExists,
    checkendTime
}
