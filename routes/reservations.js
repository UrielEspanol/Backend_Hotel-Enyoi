const express = require("express");
const router = express.Router();
const Reservation = require("../models/reservation");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);

router.post("/", async (req, res) => {
    try {
        console.log("Datos recibidos en la reserva:", req.body); // 👀 Verificar qué datos llegan
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        console.error("Error en la reserva:", error);
        res.status(400).json({ error: "Error al crear la reserva" });
    }
});

module.exports = router;
