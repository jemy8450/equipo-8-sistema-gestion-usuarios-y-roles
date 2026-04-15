const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Función para registrar un nuevo usuario
exports.registrarUsuario = async (req, res) => {
    try {
        // 1. Extraemos los datos que el usuario escribió en el formulario
        const { nombre, correo, password, rol } = req.body;

        // 2. Verificamos si ya existe alguien con ese correo en la base de datos
        let usuario = await Usuario.findOne({ correo });
        if (usuario) {
            return res.status(400).json({ msg: 'Ya existe un usuario registrado con ese correo.' });
        }

        // 3. Preparamos al nuevo usuario con sus datos
        usuario = new Usuario({ nombre, correo, password, rol });

        // 4. ¡Magia de seguridad! Encriptamos la contraseña
        const salt = await bcrypt.genSalt(10); // Creamos un nivel de encriptación
        usuario.password = await bcrypt.hash(password, salt); // Transformamos la contraseña

        // 5. Lo guardamos oficialmente en MongoDB Atlas
        await usuario.save();

        // 6. Le avisamos al frontend (Angular) que todo salió bien
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

        // 1. Revisamos si el usuario existe (buscamos por correo)
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe' });
        }

        // 2. Revisamos si la contraseña es correcta
        const passCorrecto = await bcrypt.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        // 3. Si todo es correcto, creamos su "Gafete Virtual" (Token)
        const payload = {
            usuario: {
                id: usuario.id,
                rol: usuario.rol
            }
        };

        // Firmamos el token con la palabra secreta de tu .env (dura 1 hora)
        jwt.sign(payload, process.env.JWT_SECRETA, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token, msg: 'Inicio de sesión exitoso' });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error al iniciar sesión' });
    }
};