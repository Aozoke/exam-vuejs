const Classe = require('../models/Classe');
require('../models/Cours');

const getClasses = async (req, res) => {
  try {
    const classes = await Classe.find()
      .populate('eleves')
      .populate('professeurs')
      .populate('cours.cours');

    res.json(classes);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des classes",
      error: error.message
    });
  }
};

module.exports = { getClasses };
