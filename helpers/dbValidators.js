const User = require('../models/user');

const emailExists = async( email = '' ) => {
    const usedEmail = await User.findOne({ email });
    if (usedEmail) {
        throw new Error(`email: ${ email }, is registered`);
    }
}

const userExists = async( id = '' ) => {
    const Userexists = await User.findById(id);
    if (!Userexists) {
        throw new Error(`id doesnt exists ${ id }`);
    }
}

module.exports = {
    emailExists,
    userExists,
}
