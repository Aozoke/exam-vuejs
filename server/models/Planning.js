const mongoose = require('mongoose');

const planningSchema = new mongoose.Schema({
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profil',
    required: true
  },
  cours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cours',
    required: true
  },
  professeur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profil',
    required: true
  },
  heure: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Planning', planningSchema);
