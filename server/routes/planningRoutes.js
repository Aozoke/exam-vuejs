const express = require('express');
const router = express.Router();
const { getPlanning } = require('../controllers/planningController');

router.get('/', getPlanning);

module.exports = router;
