const express = require('express');
const Doctor = require('../models/Doctor');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

module.exports = router;
