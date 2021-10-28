const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet,
        usersPut,
        usersDelete } = require('../controllers/users');
const { validations } = require("../middlewares/validations");
const { userExists } = require("../helpers/dbValidators");
const {jwtValidations} = require("../middlewares/jwt-validations");

const router = Router();

router.get('/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    validations
], usersGet);

router.put('/:id',[
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    check('id').custom(userExists),
    validations
], usersPut);

router.delete('/:id', [
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    check('id').custom(userExists),
    validations
], usersDelete);

module.exports = router;
