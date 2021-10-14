const jwt = require('jsonwebtoken');
const express = require('express');
const {config} = require("dotenv");

const getJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign( payload, 'SECRET', {
            expiresIn: '6h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'token cant be generated' )
            } else {
                resolve( token );
            }
        })
    })
}

module.exports = {
    getJWT
}

