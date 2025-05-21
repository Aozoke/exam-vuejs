const mongoose = require('mongoose');

const absenceSchema = new mongoose.Schema({
  eleve: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profil',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  motif: {
    type: String,
    required: true
  },
  justifie: {
    type: Boolean,
    default: false
  },
  justificatif_url: {
    type: String,
    default: null
  },
  valide: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Absence', absenceSchema);
