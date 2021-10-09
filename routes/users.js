const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete} = require('../controllers/users');
const {validations} = require("../middlewares/validations");
const {emailExists, Userexists} = require("../DB-helpers/DB-validators");

const router = Router();

router.get('/:id', usersGet );

router.put('/:id',[
    check('id', 'is not a valid ID').isMongoId(),
    check('id').custom( Userexists ),
    validations
],usersPut );

router.post("/",[
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is not valid').isEmail(),
    check('password', 'the password needs to have more than 4 letters').isLength({ min: 4 }),
    check('email').custom( emailExists ),
    validations
], usersPost );
    
router.delete('/:id', [
    check('id', 'is not a valid ID').isMongoId(),
    check('id').custom( Userexists ),
    validations
],usersDelete );

module.exports = router;