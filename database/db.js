const mongoose = require("mongoose");
const {mongoURI} = require('../config');

const Db = async() => {
    try {
        await mongoose.connect(
            mongoURI,
            () => console.log('Data Base Connected'),
        );
    } catch (error) {
        console.log(error);
        throw new Error('Data Base presented an error!');
    }
}

module.exports = {
    DataBase: Db
}