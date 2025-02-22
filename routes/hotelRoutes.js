const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotel');

router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.findAll();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener hoteles' });
    }
});

router.post('/', async (req, res) => {
    try {
        const hotel = await Hotel.create(req.body);
        res.status(201).json(hotel);
    } catch (error) {
        res.status(400).json({ error: 'Error al agregar hotel' });
    }
});

module.exports = router;
