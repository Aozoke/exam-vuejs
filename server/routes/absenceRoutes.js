const express = require('express');
const router = express.Router();
const { getAbsences } = require('../controllers/absenceController');


router.get('/', getAbsences);

module.exports = router;
