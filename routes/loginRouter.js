const express = require('express');
const router = express.Router();
const loginController = require('../controllers/UsuarioController');

// Rota GET: Exibir a página de login
router.get('/login', loginController.exibirLogin);

// Rota POST: Processar o login
router.post('/login', loginController.processarLogin);

// Rota GET: Realizar logout
router.get('/logout', loginController.logout);

module.exports = router;
