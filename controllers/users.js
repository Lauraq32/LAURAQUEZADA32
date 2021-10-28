const { response, request } = require('express');
const user = require('../models/user');
const axios = require('axios');
const https = require('https');
const User = require('../models/user');
const crypto = require("crypto");
const {SECRETORPRIVATEKEY} = require('../config');
const {getJWT} = require("../helpers/generate-jwt");

const usersGet = async(req = request, res = response) => {
    const id = req.params.id;

    user.findOne({ _id: id })
        .then(doc => {
            console.log("from database", doc);
            if (doc) {
                res.status(200).json({
                    user: doc,
                });
            } else {
                res.status(404).json({message: "user not found"});
            }
        });
};

const usersPost =  async (req, res ) => {
    const response = await axios({
        url: "https://api.unsplash.com/photos/random?client_id=6TQYDX1LX0NrxnMkPc-hIrnqEoqHdOMZ-07rd1WcroY",
        method: "get",
    });

    const response2 = await axios.get('https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote', {
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        })
    });

    const sha256Hasher = crypto.createHmac("sha256", SECRETORPRIVATEKEY);
    const hash = sha256Hasher.update(req.body.password).digest("hex");

    const users = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        status: req.body.status,
        img: response.data.urls.full,
        quote: response2.data.content,
    });

    users.save().then(result => {
        res.status(201).json({
            name: result.name,
            email: result.email,
            password: result.password,
            status: result.status,
            img: result.img,
            quote: result.quote,
        });
    }).catch(err => {
        res.status(404).json({
            error: err
        });
    });
};

const Login = async(req, res = response) => {
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

const usersPut = async(req, res = response) => {
    const id = req.params.id;

    const updateOps = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };

    User.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'user updated',
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err
            });
        });
};

const usersDelete = async(req, res = response) => {
    const { id } = req.params;
    await User.findByIdAndDelete( id, { status: false } );
    res.status(200).json({
        message: 'user deleted',
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    Login
}
