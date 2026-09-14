const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position/Title is required'],
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    salary: {
      type: String,
      default: '',
      trim: true,
    },
    jobUrl: {
      type: String,
      default: '',
      trim: true,
    },
    jobDescription: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['wishlist', 'applied', 'screening', 'interview', 'offer', 'rejected'],
      default: 'applied',
    },
    dateApplied: {
      type: Date,
      default: Date.now,
    },
    resumeUsed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
    },
    notes: {
      type: String,
      default: '',
    },
    interviewDate: {
      type: Date,
    },
    contacts: [
      {
        name: String,
        role: String,
        email: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
