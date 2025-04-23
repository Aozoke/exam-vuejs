const Role = require('../models/Role');

// Créer un nouveau rôle
const createRole = async (req, res) => {
  try {
    const { nom } = req.body;

    const nouveauRole = new Role({ nom });
    await nouveauRole.save();

    res.status(201).json(nouveauRole);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du rôle", error: error.message });
  }
};

// Obtenir tous les rôles
const getRoles = async (req, res) => {
  
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


module.exports = { createRole, getRoles };
