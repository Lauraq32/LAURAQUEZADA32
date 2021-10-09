const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

    constructor() {
        this.app  = express();

        this.port = process.env.PORT;

        this.usersPath = '/api/users';

        this.connectDB();

        this.middlewares();

        this.routes();
    }
     async connectDB() {
         await dbConnection()
     }
    middlewares() {
        this.app.use( cors() );

        this.app.use( express.json() );

        this.app.use( express.static('public') );
    }
    routes() {
        this.app.use( this.usersPath, require('../routes/users'));
    }
    listen() {
        this.app.listen(8080, console.log("server running on port 8080"));
    }
}
module.exports = Server;
