const express = require('express');
const router = express.Router();
const { createRole, getRoles } = require('../controllers/roleController');


router.get('/', getRoles); 

router.post('/', createRole);

module.exports = router;
