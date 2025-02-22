const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la reserva' });
    }
});

module.exports = router;
