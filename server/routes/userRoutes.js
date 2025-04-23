const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/', async (req, res) => {
    try {
      const users = await User.find().populate('role').populate('profil');
      res.json(users);
    } catch (err) {
      console.error("Erreur lors de la récupération des users :", err); // 👈 ajoute ce log
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  

  module.exports = router;