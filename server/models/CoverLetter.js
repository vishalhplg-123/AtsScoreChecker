const mongoose = require('mongoose');

const coverLetterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      default: 'Untitled Cover Letter',
      trim: true,
    },
    recipient: {
      name: { type: String, default: 'Hiring Manager' },
      title: { type: String, default: '' },
      company: { type: String, default: '' },
      address: { type: String, default: '' },
    },
    jobTitle: {
      type: String,
      default: '',
    },
    jobDescription: {
      type: String,
      default: '',
    },
    tone: {
      type: String,
      enum: ['professional', 'confident', 'concise', 'friendly'],
      default: 'professional',
    },
    content: {
      type: String,
      required: true,
    },
    resumeUsed: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('CoverLetter', coverLetterSchema);
