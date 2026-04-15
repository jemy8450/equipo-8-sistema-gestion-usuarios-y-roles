const mongoose = require('mongoose');

// Aquí definimos la estructura de nuestro Usuario (lo que pedían tus historias de Jira)
const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true, // No pueden haber dos usuarios con el mismo correo
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['Admin', 'Editor', 'Viewer'], // Los roles exactos de tu Épica 3
        default: 'Viewer' // Si alguien se registra solo, por defecto será Viewer
    }
}, {
    timestamps: true // Esto agrega automáticamente la fecha de creación y actualización
});

module.exports = mongoose.model('Usuario', usuarioSchema);