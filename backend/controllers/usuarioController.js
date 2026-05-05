const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// 1. LEER (Obtener todos los usuarios)
exports.obtenerUsuarios = async (req, res) => {
    try {
        // Buscamos todos los usuarios, pero le decimos que NO nos devuelva las contraseñas por seguridad
        const usuarios = await Usuario.find().select('-password');
        res.json(usuarios);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al obtener los usuarios' });
    }
};

// 2. ACTUALIZAR (Editar un usuario por su ID)
exports.actualizarUsuario = async (req, res) => {
    try {
        const { nombre, correo, rol, password } = req.body;
        
        // Buscamos si el usuario existe por el ID que nos pasan en la URL
        let usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Actualizamos los datos
        usuario.nombre = nombre || usuario.nombre;
        usuario.correo = correo || usuario.correo;
        usuario.rol = rol || usuario.rol;

        // Si el admin decide cambiarle la contraseña, la encriptamos de nuevo
        if (password) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(password, salt);
        }

        // Guardamos los cambios
        usuario = await Usuario.findByIdAndUpdate(req.params.id, usuario, { new: true }).select('-password');
        res.json({ msg: 'Usuario actualizado correctamente', usuario });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al actualizar el usuario' });
    }
};

// 3. ELIMINAR (Borrar un usuario por su ID)
exports.eliminarUsuario = async (req, res) => {
    try {
        let usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Lo eliminamos de la base de datos
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Usuario eliminado exitosamente' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al eliminar el usuario' });
    }
};
// ==========================================
// FUNCIONES DE PERFIL (Para cualquier usuario)
// ==========================================

// 4. Ver mi propio perfil
exports.obtenerMiPerfil = async (req, res) => {
    try {
        // Buscamos al usuario usando el ID que viene en su Token
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al obtener tu perfil' });
    }
};

// 5. Actualizar mi propio perfil
exports.actualizarMiPerfil = async (req, res) => {
    try {
        // Nota: NO incluimos 'rol' aquí para evitar que se auto-asciendan
        const { nombre, correo, password } = req.body; 
        
        let usuario = await Usuario.findById(req.usuario.id);
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Actualizamos solo los datos permitidos
        usuario.nombre = nombre || usuario.nombre;
        usuario.correo = correo || usuario.correo;

        // Si decide cambiar su contraseña, la encriptamos
        if (password) {
            const salt = await bcrypt.genSalt(10);
            usuario.password = await bcrypt.hash(password, salt);
        }

        // Guardamos los cambios
        usuario = await Usuario.findByIdAndUpdate(req.usuario.id, usuario, { new: true }).select('-password');
        res.json({ msg: 'Tu perfil ha sido actualizado correctamente', usuario });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al actualizar tu perfil' });
    }
};
// 6. OBTENER UN USUARIO POR SU ID (para consultas específicas)
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('-password');
        
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al obtener el usuario' });
    }
};