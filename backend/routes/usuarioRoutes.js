const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarToken, esAdmin } = require('../middleware/authMiddleware');

// ==========================================
// RUTAS DE PERFIL (Cualquier usuario con sesión iniciada)
// URL: http://localhost:3000/api/usuarios/perfil
// ==========================================
// Solo necesitan pasar por el guardia 'verificarToken'
router.get('/perfil', verificarToken, usuarioController.obtenerMiPerfil);
router.put('/perfil', verificarToken, usuarioController.actualizarMiPerfil);

// ==========================================
// RUTAS DE ADMINISTRADOR (CRUD Completo)
// URL: http://localhost:3000/api/usuarios
// ==========================================
// Tienen que pasar por ambos guardias: verificarToken Y esAdmin
router.get('/', verificarToken, esAdmin, usuarioController.obtenerUsuarios);
router.put('/:id', verificarToken, esAdmin, usuarioController.actualizarUsuario);
router.delete('/:id', verificarToken, esAdmin, usuarioController.eliminarUsuario);

module.exports = router;