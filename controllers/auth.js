const { response } = require('express');
const User = require('../models/user');
const { getJWT } = require('../helpers/generate-jwt');
const crypto = require("crypto");
const {SECRETORPRIVATEKEY} = require('../config');

const login = async(req, res = response) => {
    const { email, password }  = req.body;

    try {
        const sha256Hasher = crypto.createHmac("sha256", SECRETORPRIVATEKEY);
        const hash = sha256Hasher.update(password).digest("hex");

        const user = await User.findOne({ email, password: hash });
        if (!user) {
            return res.status(401).json({
                msg: 'Invalid credentials'
            });
        }
        if (!user.status) {
            return res.status(401).json({
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