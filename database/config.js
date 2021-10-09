const mongoose = require('mongoose');
const dbConnection = async() => {

    try {
        await mongoose.connect(
            'MONGODB_CNN=mongodb+srv://lauraquezada:Macoris@cluster0.ojcll.mongodb.net/starwars',
            () => console.log('Data Base Connected')
        );

    } catch (error) {
        console.log(error);
        throw new Error('Data Base presented an error!');
    }
}

module.exports = {
    dbConnection
}
