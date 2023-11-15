const express = require('express');
const { handleLogin } = require('../controllers/loginController');
const { loginLimiter } = require('../middlewares/limit');
const router = express.Router();

router.post('/', loginLimiter, handleLogin)

module.exports = router