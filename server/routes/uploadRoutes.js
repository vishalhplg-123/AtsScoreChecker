const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadAndParseResume } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

router.post('/resume', protect, upload.single('file'), uploadAndParseResume);

module.exports = router;
