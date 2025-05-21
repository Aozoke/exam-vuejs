const express = require('express');
const router = express.Router();
const { getNews } = require('../controllers/newController');

router.get('/', getNews);

module.exports = router;
