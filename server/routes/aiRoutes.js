const express = require('express');
const router = express.Router();
const {
  generateSummary,
  improveBullet,
  generateSkills,
  analyzeResume,
  tailorResume,
  generateCoverLetter,
  getInterviewPrep,
  evaluateAnswer,
  generateInitialResume,
} = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/generate-summary', generateSummary);
router.post('/improve-bullet', improveBullet);
router.post('/generate-skills', generateSkills);
router.post('/analyze-resume', analyzeResume);
router.post('/tailor-resume', tailorResume);
router.post('/generate-cover-letter', generateCoverLetter);
router.post('/interview-prep', getInterviewPrep);
router.post('/evaluate-answer', evaluateAnswer);
router.post('/generate-initial-resume', generateInitialResume);

module.exports = router;
