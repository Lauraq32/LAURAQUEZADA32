const jwt = require('jsonwebtoken');
const {response, request} = require("express");
const {config} = require("dotenv");

const jwtValidations = ( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'Need a valid token to proceed'
        });
    }
    try {
         const payload = jwt.verify( token, 'SECRET' );
         console.log(payload);
             next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Insert valid token to proceed'
        })
    }

}

module.exports = {
    jwtValidations
}