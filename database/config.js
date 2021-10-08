const mongoose = require('mongoose');
const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
    
        console.log('Data Base Connected');

    } catch (error) {
        console.log(error);
        throw new Error('Data Base presented an error!');
    }


}
module.exports = {
    dbConnection
}
