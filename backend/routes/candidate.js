const express = require('express');
const { handleAddingCandidate, handleDeletingCandidate } = require('../controllers/candidateController');
const multer = require('multer');
const storage = require('../middlewares/multerStorage');
const pdfToText = require('../middlewares/pdfToText');
const GPTmodel = require('../middlewares/GPTmodel');
const upload = multer({ storage })
const router = express.Router();

router.route('/')
    .post(upload.single('file'), pdfToText, GPTmodel, handleAddingCandidate)
router.route('/:id')
    .delete(handleDeletingCandidate)

module.exports = router