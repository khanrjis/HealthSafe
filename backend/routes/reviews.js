const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
