const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);
app.use('/hotels', hotelRoutes);
app.use('/reservations', reservationRoutes);

sequelize.sync({ force: false }).then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
}).catch(err => console.error('Error al sincronizar la base de datos:', err));
