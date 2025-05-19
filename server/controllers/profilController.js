const Profil = require('../models/Profil');

// GET /api/profils
const getProfils = async (req, res) => {
  try {
    const profils = await Profil.find();
    res.json(profils);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des profils",
      error: error.message
    });
  }
};

// POST /api/profils
const createProfil = async (req, res) => {
  try {
    const nouveauProfil = new Profil(req.body);
    await nouveauProfil.save();
    res.status(201).json(nouveauProfil);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du profil", error: error.message });
  }
};


module.exports = { getProfils, createProfil };
