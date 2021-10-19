const jwt = require('jsonwebtoken');
const express = require('express');
const {SECRETORPRIVATEKEY} = require('../config');

const getJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign( payload, SECRETORPRIVATEKEY, {
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

