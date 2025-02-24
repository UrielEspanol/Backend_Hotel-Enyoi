const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Asegurar que las variables de entorno no tengan caracteres ocultos
const DB_NAME = process.env.DB_NAME?.trim();
const DB_USER = process.env.DB_USER?.trim();
const DB_PASSWORD = process.env.DB_PASSWORD?.trim();
const DB_HOST = process.env.DB_HOST?.trim();
const DB_PORT = process.env.DB_PORT?.trim() || '3306';  // Puerto por defecto
const DB_DIALECT = 'mysql';  // Dialecto fijo para MySQL

// Verificar que todas las variables necesarias estén definidas
console.log("🔍 Verificando conexión con MySQL:", {
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD ? "****" : "(VACÍO)", // No mostrar la contraseña real
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
});

if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
    console.error('❌ Error: Faltan variables de entorno en .env');
    process.exit(1);
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: false,
});

module.exports = { sequelize };
