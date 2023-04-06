/*
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getNotas, crearNota, actualizarNota, eliminarNota, archivarNota } = require('../controllers/notes');

const router = Router();

// Obtener eventos 
router.get('/', getNotas );

// Crear una nueva nota
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('description',' La Descripción es obligatoria').not().isEmpty(),
        
        validarCampos
    ],
    crearNota 
);

// Actualizar nota
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('description',' La Descripción es obligatoria').not().isEmpty(),
        
        validarCampos
    ],
    actualizarNota 
);

// Borrar nota
router.delete('/:id', eliminarNota );

// Archivar una nota
router.put('/filed/:id', archivarNota );

module.exports = router;

