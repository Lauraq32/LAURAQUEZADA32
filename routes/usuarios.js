const { Router } = require('express');


const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();


router.get('/:id', usuariosGet );

router.put('/:id',usuariosPut );

router.post("/", usuariosPost);
    
router.delete('/:id',usuariosDelete );







module.exports = router;