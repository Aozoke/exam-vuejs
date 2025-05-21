const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', newsSchema);
