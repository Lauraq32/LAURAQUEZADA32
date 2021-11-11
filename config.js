const sgMAIL = require('@sendgrid/mail'); 
const mongoURI = 'mongodb+srv://lauraquezada:Macoris@cluster0.ojcll.mongodb.net/starwars'
const SECRETORPRIVATEKEY ='thisIsMyPublicKey23';

const API_KEY =
    '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';

sgMAIL.setApiKey(API_KEY)

module.exports = {
    mongoURI,
    SECRETORPRIVATEKEY,
    API_KEY
}
