const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, date, message } = req.body;
    const appointment = new Appointment({ name, email, phone, date, message });
    await appointment.save();
    res.status(201).json({ message: 'Appointment created', appointment });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create appointment' });
  }
});

module.exports = router;
