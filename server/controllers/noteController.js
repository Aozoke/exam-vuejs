const Note = require('../models/Note');
require('../models/Profil');
require('../models/Cours');  


const getNotes = async (req, res) => {
  try {
    const notes = await Note.find()
      .populate('eleve')
      .populate('cours');
      
    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des notes",
      error: error.message
    });
  }
};

module.exports = { getNotes };
