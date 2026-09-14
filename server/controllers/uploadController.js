const { extractRawText, parseResumeText } = require('../services/parserService');
const { analyzeResumeATS } = require('../services/atsService');

// @desc    Upload and parse resume file (PDF or DOCX)
// @route   POST /api/upload/resume
// @access  Private
const uploadAndParseResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a valid PDF or DOCX file under 5MB.',
      });
    }

    const rawText = await extractRawText(req.file.buffer, req.file.mimetype, req.file.originalname);
    if (!rawText || rawText.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract readable text from this file. Ensure it is not a scanned image.',
      });
    }

    const parsedResult = parseResumeText(rawText);
    const atsScore = analyzeResumeATS(parsedResult.extracted);

    res.status(200).json({
      success: true,
      message: 'Resume parsed successfully. Review extracted information before creating your resume.',
      data: {
        ...parsedResult.extracted,
        atsScore: atsScore.overallScore,
        atsAnalysis: atsScore,
        originalFileName: req.file.originalname,
      },
    });
  } catch (error) {
    console.error('File parsing error:', error);
    next(error);
  }
};

module.exports = {
  uploadAndParseResume,
};
