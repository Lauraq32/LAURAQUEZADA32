const { response } = require('express');
const User = require('../models/user');
const { getJWT } = require('../helpers/generate-jwt');


const login = async(req, res = response) => {
    const {email}  = req.body;

    try {
        const user = await User.findOne({ email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'the email is not registered'
            });
        }
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'this email is not activated'
            });
        }
        const token = await getJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'talk to admin'
        });
    }
}

module.exports = {
    login
}