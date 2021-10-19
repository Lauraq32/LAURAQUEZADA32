const User = require('../models/user');

const emailExists = async( email = '' ) => {
    const usedEmail = await User.findOne({ email });
    if (usedEmail) {
        throw new Error(`email: ${ email }, is registered`);
    }
}

const user = async( id = '' ) => {
    const userExists = await User.findById(id);
    if (!userExists) {
        throw new Error(`id doesnt exists ${ id }`);
    }
}

module.exports = {
    emailExists,
    user
}
