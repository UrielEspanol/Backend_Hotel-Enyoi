const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { sequelize } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

console.log('🛠️ Variables de entorno cargadas:');
console.log('PORT:', JSON.stringify(process.env.PORT));
console.log('DB_NAME:', JSON.stringify(process.env.DB_NAME));
console.log('DB_USER:', JSON.stringify(process.env.DB_USER));
console.log('DB_HOST:', JSON.stringify(process.env.DB_HOST));
console.log('DB_DIALECT:', JSON.stringify(process.env.DB_DIALECT));
console.log('JWT_SECRET:', JSON.stringify(process.env.JWT_SECRET));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/hotels', hotelRoutes);
app.use('/reservations', reservationRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('✅ Conexión a la base de datos exitosa.');
        return sequelize.sync({ force: false });
    })
    .then(() => {
        console.log('✅ Base de datos sincronizada correctamente.');
        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
    })
    .catch(err => console.error('❌ Error al conectar con la base de datos:', err));