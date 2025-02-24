const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) return res.status(400).json({ error: 'El correo ya está registrado' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: { id: newUser.id, email: newUser.email } });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};
