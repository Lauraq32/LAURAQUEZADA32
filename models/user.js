const { Schema, model } = require('mongoose');
const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'the password is mandatory'],
    },
    img: {
        type: String,
    },
    quote: {
        type: String,
    },
});

module.exports = model( 'User', UserSchema );
