const JobApplication = require('../models/JobApplication');

// @desc    Get all job applications for user
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res, next) => {
  try {
    const jobs = await JobApplication.find({ userId: req.user._id })
      .populate('resumeUsed', 'title template atsScore')
      .sort({ updatedAt: -1 });

    // Calculate quick stats
    const total = jobs.length;
    const byStatus = {
      wishlist: jobs.filter((j) => j.status === 'wishlist').length,
      applied: jobs.filter((j) => j.status === 'applied').length,
      screening: jobs.filter((j) => j.status === 'screening').length,
      interview: jobs.filter((j) => j.status === 'interview').length,
      offer: jobs.filter((j) => j.status === 'offer').length,
      rejected: jobs.filter((j) => j.status === 'rejected').length,
    };

    res.status(200).json({
      success: true,
      stats: {
        total,
        interviews: byStatus.interview + byStatus.screening,
        offers: byStatus.offer,
        byStatus,
      },
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create job application
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res, next) => {
  try {
    const job = await JobApplication.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update job application
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res, next) => {
  try {
    let job = await JobApplication.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job application not found' });
    }

    if (job.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    job = await JobApplication.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete job application
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res, next) => {
  try {
    const job = await JobApplication.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job application not found' });
    }

    if (job.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await JobApplication.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Job application deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
};
