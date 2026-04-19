const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  social: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String }
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
