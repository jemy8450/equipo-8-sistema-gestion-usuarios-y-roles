const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conexión exitosa a la Base de Datos (MongoDB Atlas)'))
  .catch((error) => console.error('❌ Error conectando a MongoDB:', error));

app.get('/', (req, res) => {
    res.send('¡El servidor del Equipo 8 está funcionando perfectamente y nos pudimos conectar a la base de datos!');
});

// --- NUEVO: Importar nuestras rutas ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes')); // 
// --------------------------------------

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});