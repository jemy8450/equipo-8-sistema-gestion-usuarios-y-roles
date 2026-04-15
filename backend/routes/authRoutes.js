const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
// Es un método POST porque vamos a "enviar" información nueva a la base de datos

// La URL final será: http://localhost:3000/api/auth/registrar
router.post('/registrar', authController.registrarUsuario);

// Ruta para iniciar sesión: http://localhost:3000/api/auth/login
router.post('/login', authController.iniciarSesion);

module.exports = router;