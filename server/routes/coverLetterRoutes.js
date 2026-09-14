const express = require('express');
const router = express.Router();
const {
  getCoverLetters,
  getCoverLetterById,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
} = require('../controllers/coverLetterController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getCoverLetters).post(createCoverLetter);
router.route('/:id').get(getCoverLetterById).put(updateCoverLetter).delete(deleteCoverLetter);

module.exports = router;
