const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        let usuario = await Usuario.findOne({ correo });
        if (usuario) {
            return res.status(400).json({ msg: 'Ya existe un usuario registrado con ese correo.' });
        }

        // Siempre se asigna Viewer al registrarse
        usuario = new Usuario({ nombre, correo, password, rol: 'Viewer' });

        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        await usuario.save();

        res.status(201).json({ msg: 'Usuario registrado exitosamente' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error en el servidor al registrar el usuario' });
    }
};

// Función para Iniciar Sesión
exports.iniciarSesion = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const payload = {
            usuario: {
                id: usuario.id,
                rol: usuario.rol
            }
        };

        jwt.sign(payload, process.env.JWT_SECRETA, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token, msg: 'Inicio de sesión exitoso' });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al iniciar sesión' });
    }
};