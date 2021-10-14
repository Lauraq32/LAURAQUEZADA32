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
    status: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
    },
    quote: {
        type: String,
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserSchema);
