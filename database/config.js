const mongoose = require('mongoose');
const {config} = require("dotenv");

const dbConnection = async() => {
    try {
        await mongoose.connect(
            'mongodb+srv://lauraquezada:Macoris@cluster0.ojcll.mongodb.net/starwars',
            () => console.log('Data Base Connected'),
        );
    } catch (error) {
        console.log(error);
        throw new Error('Data Base presented an error!');
    }
}

SECRET='thisIsMyPublicKey23'

module.exports = {
    dbConnection
}
