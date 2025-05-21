const Planning = require('../models/Planning');
require('../models/Profil');
require('../models/Cours');

// GET /api/planning
const getPlanning = async (req, res) => {
  try {
    const planning = await Planning.find()
      .populate('eleve')
      .populate('cours')
      .populate('professeur');

    res.json(planning);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du planning",
      error: error.message
    });
  }
};

module.exports = { getPlanning };
