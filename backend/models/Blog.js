const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String },
  excerpt: { type: String, required: true },
  content: { type: String }
});

module.exports = mongoose.model('Blog', blogSchema);
