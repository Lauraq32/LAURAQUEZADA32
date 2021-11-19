const { Router } = require('express');
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations");
const {emailExists} = require("../helpers/dbValidators");
const {usersPost, Login} = require("../controllers/users");

const router = Router();

router.post('/login', [
  check('email', 'the email is mandatory').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validations
], Login);

router.post("/createUser",[
  check('name', 'name is required').not().isEmpty(),
  check('email', 'email is not valid').isEmail(),
  check('password', 'the password needs to have more than 4 letters').isLength({ min: 4 }),
  check('email').custom(emailExists),
  validations
], usersPost);

module.exports = router;


