const mongoose = require('mongoose');

const coursSchema = new mongoose.Schema({
  titre: { type: String, required: true }
});

module.exports = mongoose.model('Cours', coursSchema);
