const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

module.exports = router;
