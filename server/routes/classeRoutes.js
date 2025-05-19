const express = require('express');
const router = express.Router();
const { getClasses } = require('../controllers/classeController');

router.get('/', getClasses);

module.exports = router;
