const CoverLetter = require('../models/CoverLetter');

// @desc    Get all cover letters for user
// @route   GET /api/cover-letters
// @access  Private
const getCoverLetters = async (req, res, next) => {
  try {
    const letters = await CoverLetter.find({ userId: req.user._id })
      .populate('resumeUsed', 'title')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: letters.length,
      data: letters,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single cover letter
// @route   GET /api/cover-letters/:id
// @access  Private
const getCoverLetterById = async (req, res, next) => {
  try {
    const letter = await CoverLetter.findById(req.params.id);

    if (!letter) {
      return res.status(404).json({ success: false, message: 'Cover letter not found' });
    }

    if (letter.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({ success: true, data: letter });
  } catch (error) {
    next(error);
  }
};

// @desc    Create cover letter
// @route   POST /api/cover-letters
// @access  Private
const createCoverLetter = async (req, res, next) => {
  try {
    const letter = await CoverLetter.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({ success: true, data: letter });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cover letter
// @route   PUT /api/cover-letters/:id
// @access  Private
const updateCoverLetter = async (req, res, next) => {
  try {
    let letter = await CoverLetter.findById(req.params.id);

    if (!letter) {
      return res.status(404).json({ success: false, message: 'Cover letter not found' });
    }

    if (letter.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    letter = await CoverLetter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: letter });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete cover letter
// @route   DELETE /api/cover-letters/:id
// @access  Private
const deleteCoverLetter = async (req, res, next) => {
  try {
    const letter = await CoverLetter.findById(req.params.id);

    if (!letter) {
      return res.status(404).json({ success: false, message: 'Cover letter not found' });
    }

    if (letter.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await CoverLetter.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Cover letter deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCoverLetters,
  getCoverLetterById,
  createCoverLetter,
  updateCoverLetter,
  deleteCoverLetter,
};
