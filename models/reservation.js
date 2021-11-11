const { Schema, model} = require('mongoose');
const ReservationSchema = Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    product: {
        type: String,
    },
    startTime: {
        type: String,
        required: [true, 'valid startTime is required']
    },
    endTime: {
        type: String,
        required: [true, 'valid endTime is required']
    },
});

module.exports = model('Reservation', ReservationSchema);