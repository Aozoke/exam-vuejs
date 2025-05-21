const Absence = require('../models/Absence');
require('../models/Profil');


const getAbsences = async (req, res) => {
  try {
    const absences = await Absence.find()
      .populate('eleve');

    res.json(absences);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des absences",
      error: error.message
    });
  }
};

module.exports = { getAbsences };
