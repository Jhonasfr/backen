const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');

// Definición de rutas
router
    .get('/', signoController.getAllSignos)
    .get('/:signo', signoController.getOneSigno)
    .get('/:signo/:tipoPersona', signoController.getHoroscopoByPersona) // Nueva ruta para obtener horóscopos por signo y tipo de persona
    .patch('/:signoEditar', signoController.updateSigno)
    .post('/login', signoController.login)
    .post('/ChangePassword', signoController.ChangePassword) // Nueva ruta para cambiar la contraseña
    .post('/addUser', signoController.addUser)
    .get('/viewUser', signoController.viewUser);

module.exports = router;
