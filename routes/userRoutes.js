const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'Usuario registrado', user: newUser });
    } catch (error) {
        res.status(400).json({ error: 'Error en el registro' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
    }
});

module.exports = router;
