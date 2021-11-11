const express = require('express');
const cors = require('cors');
const {DataBase} = require("../database/db");

class Server {

    constructor() {
        this.app  = express();
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';
        this.reservationPath = '/api/reservation';
        
        this.DataBase();
        this.middlewares();
        this.routes();
    }

    async DataBase() {
        await DataBase();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.usersPath, require('../routes/users'));
        this.app.use( this.reservationPath, require('../routes/reservation'));
    }

    listen() {
        this.app.listen(8080, console.log("server running on port 8080"));
    }
}

module.exports = Server;
