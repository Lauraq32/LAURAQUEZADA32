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

const ReservationExists = async( email = '' ) => {
    const reservationEmail = await Reservation.findOne({ email });
    if (reservationEmail) {
        throw new Error(`${ email }, is already registered`);
    }
}

const productExists = async( product = '' ) => {
    const productExists = await Reservation.findOne({ product });
    if (productExists) {
        throw new Error(`${ product }, is reserved at this time, please select another time`);
    }
}

const reservationTimeExists = async( startTime = '' ) => {
    const startTimeExists = await Reservation.findOne({ startTime });
    if (startTimeExists) {
        throw new Error(`${ startTime }, this time slot is reserved, please try another time`);
    }
}

module.exports = {
    emailExists,
    user,
    reservationExists,
    ReservationExists,
    productExists,
    reservationTimeExists
}
