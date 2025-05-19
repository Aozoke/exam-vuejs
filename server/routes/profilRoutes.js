const express = require('express');
const router = express.Router();
const { getProfils, createProfil } = require('../controllers/profilController');

router.get('/', getProfils);

router.post('/', createProfil);

module.exports = router;
