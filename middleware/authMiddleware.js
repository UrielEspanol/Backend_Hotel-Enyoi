const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Cargue variables de entorno

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado o formato incorrecto' });
    }

    const token = authHeader.split(' ')[1]; // Extraer el token sin "Bearer "
    
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Guardar info del usuario en la request
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};
