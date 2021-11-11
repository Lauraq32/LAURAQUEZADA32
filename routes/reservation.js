const { Router } = require('express');
const { check } = require('express-validator');

const { reservationGet,
        reservationPut,
        reservationDelete } = require('../controllers/reservation');
const {jwtValidations} = require("../middlewares/jwt-validations");
const { validations } = require("../middlewares/validations");
const { reservationExists } = require("../helpers/dbValidators");

const router = Router();


router.put('/:id',[
    jwtValidations,
    check('id', 'is not a valid ID').isMongoId(),
    check('id').custom(reservationExists),
    validations
], reservationPut);

router.get('/:id', [
    jwtValidations,
    check('id', 'need a valid ID for reservation').isMongoId(),
    validations
], reservationGet);

router.delete('/:id', [
    jwtValidations,
    check('id').custom(reservationExists),
    check('id', 'is not a valid ID').isMongoId(),
    validations
], reservationDelete);

module.exports = router;