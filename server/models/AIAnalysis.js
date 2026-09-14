const mongoose = require('mongoose');

const aiAnalysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume',
      index: true,
    },
    type: {
      type: String,
      enum: ['ats_check', 'job_tailor', 'bullet_improve', 'summary_generate', 'interview_prep'],
      required: true,
    },
    targetJobTitle: {
      type: String,
      default: '',
    },
    jobDescription: {
      type: String,
      default: '',
    },
    overallScore: {
      type: Number,
      default: 0,
    },
    scores: {
      keywordMatch: Number,
      experienceRelevance: Number,
      skillsMatch: Number,
      formattingQuality: Number,
      summaryQuality: Number,
    },
    analysisResult: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AIAnalysis', aiAnalysisSchema);
