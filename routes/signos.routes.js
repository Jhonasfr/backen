const express = require('express');
const router = express.Router();
const signoController = require('./controllers/signoController.js');

// Definición de rutas
router
    .get('/viewUser', signoController.viewUser)
    .get('/getCodes', signoController.getCodes)
    .patch('/redeemCode', signoController.redeemCode)
    .post('/login', signoController.login)
    .post('/ChangePassword', signoController.ChangePassword) 
    .post('/addUser', signoController.addUser);

module.exports = router;
