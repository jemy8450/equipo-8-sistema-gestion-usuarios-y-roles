const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verificarToken, esAdmin, esAdminOEditor } = require('../middleware/authMiddleware');

// ==========================================
// RUTAS DE PERFIL (Cualquier usuario autenticado)
// ==========================================
router.get('/perfil', verificarToken, usuarioController.obtenerMiPerfil);
router.put('/perfil', verificarToken, usuarioController.actualizarMiPerfil);

// ==========================================
// RUTAS DE ADMIN Y EDITOR
// ==========================================
// Admin y Editor pueden ver la lista de usuarios
router.get('/', verificarToken, esAdminOEditor, usuarioController.obtenerUsuarios);

// Solo Admin puede editar, eliminar y ver por ID
router.put('/:id', verificarToken, esAdminOEditor, usuarioController.actualizarUsuario);
router.delete('/:id', verificarToken, esAdmin, usuarioController.eliminarUsuario);
router.get('/:id', verificarToken, esAdmin, usuarioController.obtenerUsuarioPorId);

module.exports = router;