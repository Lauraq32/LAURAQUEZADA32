const { response, request } = require('express');
const user = require('../models/user');
const axios = require('axios');
const https = require('https');


const User = require('../models/user');


const usersGet = async(req = request, res = response) => {
    const id = req.params.id;
    user.findOne({ _id: id })
    try {
        const users = await User.findOne();
        if(!user) throw Error('user not found');
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ msg: err })
    }
};
const usersPost =  async (req, res ) => {
    const newUser = new User(req.body);
    try {
        const user = await newUser.save();
        if(!user) throw Error('something went wrong');

        res.status(201).json(user);
    } catch (err){
        res.status(400).json({ msg: err })
    }
    const response = await axios({
        url: "https://api.unsplash.com/photos/random?client_id=6TQYDX1LX0NrxnMkPc-hIrnqEoqHdOMZ-07rd1WcroY",
        method: "get",
    });
    const response2 = await axios({
        url: "https://free-quotes-api.herokuapp.com/",
        method: "get",
    });
    console.log(response2.data)
    const users = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        img: response.data.urls.full,
        quote: response2.data
    });
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
      console.log(err);
      res.status(500).json({
        error: err
      });
    
});
    }
    const usersDelete = async(req, res = response) => {
    const id = req.params.Id;
    User.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'user deleted',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
}