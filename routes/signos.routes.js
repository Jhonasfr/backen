const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');
router
    .get('/viewUser', signoController.viewUser)
    .get('/getCodes', signoController.getCodes)
    .patch('/redeemCode', signoController.redeemCode)
    .post('/login', signoController.login)
    .post('/ChangePassword', signoController.ChangePassword) // Nueva ruta para cambiar la contraseña
    .post('/addUser', signoController.addUser);

module.exports = router;
