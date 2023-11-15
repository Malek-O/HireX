const express = require('express');
const { handleRefresh } = require('../controllers/refreshController');
const router = express.Router();

router.get('/', handleRefresh)

module.exports = router