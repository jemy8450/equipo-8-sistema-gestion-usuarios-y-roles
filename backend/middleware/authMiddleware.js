const jwt = require('jsonwebtoken');

// GUARDIA 1: Verifica si el usuario inició sesión (si tiene un Token válido)
exports.verificarToken = (req, res, next) => {
    // Le pedimos el token de la cabecera (header) de la petición
    const token = req.header('x-auth-token');

    // Si no trae token, lo rebotamos en la entrada
    if (!token) {
        return res.status(401).json({ msg: 'No hay token, permiso denegado. Inicia sesión primero.' });
    }

    try {
        // Si trae token, verificamos que sea auténtico usando nuestra palabra secreta del .env
        const cifrado = jwt.verify(token, process.env.JWT_SECRETA);
        
        // Extraemos los datos del usuario (id y rol) que estaban ocultos en el token
        req.usuario = cifrado.usuario; 
        
        // Le damos el pase al siguiente guardia o al controlador
        next(); 
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido o expirado.' });
    }
};

// GUARDIA 2: Verifica si el usuario tiene el nivel de "Admin"
exports.esAdmin = (req, res, next) => {
    // Si su rol no es Admin, le negamos el acceso a la función
    if (req.usuario.rol !== 'Admin') {
        return res.status(403).json({ msg: 'Acceso denegado: Área exclusiva para Administradores.' });
    }
    // Si es Admin, lo dejamos pasar
    next();
};