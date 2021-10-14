const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const {validations} = require("../middlewares/validations");


const router = Router();

router.post('/login',[
  check('email', 'the email is mandatory').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validations
],login );

module.exports = router;
