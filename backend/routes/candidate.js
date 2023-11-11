const express = require('express');
const { handleAddingCandidate } = require('../controllers/candidateController');
const multer = require('multer');
const storage = require('../middlewares/multerStorage');
const pdfToText = require('../middlewares/pdfToText');
const GPTmodel = require('../middlewares/GPTmodel');
const upload = multer({ storage })
const router = express.Router();

router.post('/', upload.single('file'), pdfToText, GPTmodel, handleAddingCandidate)

module.exports = router