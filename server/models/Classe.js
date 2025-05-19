const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({
  cursus: { type: String, required: true },
  titre: { type: String, required: true },

  // élèves associés (type eleve dans Profil)
  eleves: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profil' }],

  // professeurs associés (type prof dans Profil)
  professeurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profil' }],

  // liste des cours associés
  cours: [
    {
      cours: { type: mongoose.Schema.Types.ObjectId, ref: 'Cours' },
      titre: String
    }
  ]
});

module.exports = mongoose.model('Classe', classeSchema);
