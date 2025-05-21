const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  note: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  },
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profil',
    required: true
  },
  cours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cours',
    required: true
  }
});

module.exports = mongoose.model('Note', noteSchema);
