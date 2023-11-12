const express = require('express');
const { handleAddingCandidate, handleDeletingCandidate, handleGetAllCandidates, handleGetSingleCandidates } = require('../controllers/candidateController');
const multer = require('multer');
const storage = require('../middlewares/multerStorage');
const pdfToText = require('../middlewares/pdfToText');
const GPTmodel = require('../middlewares/GPTmodel');
const upload = multer({ storage })
const router = express.Router();

router.route('/')
    .post(upload.single('file'), pdfToText, GPTmodel, handleAddingCandidate)
    .get(handleGetAllCandidates)
router.route('/:id')
    .delete(handleDeletingCandidate)
    .get(handleGetSingleCandidates)

module.exports = router