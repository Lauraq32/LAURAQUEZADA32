const { response, request } = require('express');
const usuario = require('../models/usuario');
const axios = require('axios');
const https = require('https');


const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {
    const id = req.params.id;
    usuario.findOne({ _id: id })
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
        });
      } else {
        res
          .status(404)
          .json({ message: "user not found" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

   

const usuariosPost =  async (req, res ) => {
    const response = await axios({
        url: "https://api.unsplash.com/photos/random?client_id=6TQYDX1LX0NrxnMkPc-hIrnqEoqHdOMZ-07rd1WcroY",
        method: "get",
    });
    const response2 = await axios({
        url: "https://free-quotes-api.herokuapp.com/",
        method: "get",
  });
    console.log(response2.data.freeQuotesApi)
    const usuarios = new Usuario({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    rol: req.body.rol,
    img: response.data.urls.full,
    quote: response2.data.freeQuotesApi
    
  });
    usuarios
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "user Created successfully",
        createdUsuario: {
            name: result.name,
            email: result.email,
            password: result.password,
            rol: req.body.rol
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


    const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const updateOps = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol
      };
    
  Usuario.updateOne({ _id: id }, { $set: updateOps })
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
    const usuariosDelete = async(req, res = response) => {
    const id = req.params.Id;
    Usuario.deleteOne({ _id: id })
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
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}