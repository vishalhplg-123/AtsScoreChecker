const aiService = require('../services/aiService');
const Resume = require('../models/Resume');
const AIAnalysis = require('../models/AIAnalysis');

// @desc    Generate professional summaries
// @route   POST /api/ai/generate-summary
// @access  Private
const generateSummary = async (req, res, next) => {
  try {
    const { role, experienceLevel, skills, background } = req.body;
    const result = await aiService.generateSummary({ role, experienceLevel, skills, background });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Improve resume bullet point
// @route   POST /api/ai/improve-bullet
// @access  Private
const improveBullet = async (req, res, next) => {
  try {
    const { bullet, action, role, industry } = req.body;
    if (!bullet) {
      return res.status(400).json({ success: false, message: 'Please provide a bullet point to improve.' });
    }
    const result = await aiService.improveBullet({ bullet, action, role, industry });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Suggest skills for role or job description
// @route   POST /api/ai/generate-skills
// @access  Private
const generateSkills = async (req, res, next) => {
  try {
    const { role, jobDescription, existingSkills } = req.body;
    const result = await aiService.suggestSkills({ role, jobDescription, existingSkills });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze resume for ATS score & feedback
// @route   POST /api/ai/analyze-resume
// @access  Private
const analyzeResume = async (req, res, next) => {
  try {
    const { resumeId, resumeData, jobDescription } = req.body;
    let resume = resumeData;

    if (resumeId && !resume) {
      resume = await Resume.findById(resumeId);
      if (!resume) {
        return res.status(404).json({ success: false, message: 'Resume not found' });
      }
    }

    if (!resume) {
      return res.status(400).json({ success: false, message: 'Resume content or ID is required.' });
    }

    const result = await aiService.analyzeATS({ resumeData: resume, jobDescription });

    // Optionally save AI analysis history
    if (req.user) {
      await AIAnalysis.create({
        userId: req.user._id,
        resumeId: resumeId || resume._id || null,
        type: 'ats_check',
        jobDescription: jobDescription || '',
        overallScore: result.overallScore,
        scores: result.scores,
        analysisResult: result,
      });

      // Update resume's cached atsScore if resumeId exists
      if (resumeId) {
        await Resume.findByIdAndUpdate(resumeId, {
          atsScore: result.overallScore,
          lastAtsAnalysis: result,
        });
      }
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Tailor resume against job description
// @route   POST /api/ai/tailor-resume
// @access  Private
const tailorResume = async (req, res, next) => {
  try {
    const { resumeId, resumeData, jobDescription } = req.body;
    let resume = resumeData;

    if (resumeId && !resume) {
      resume = await Resume.findById(resumeId);
    }

    if (!resume || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: 'Both resume data and job description are required for job tailoring.',
      });
    }

    const result = await aiService.tailorResume({ resumeData: resume, jobDescription });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate tailored Cover Letter
// @route   POST /api/ai/generate-cover-letter
// @access  Private
const generateCoverLetter = async (req, res, next) => {
  try {
    const { resumeData, company, jobTitle, jobDescription, tone } = req.body;

    if (!company || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'Company name and job title are required.',
      });
    }

    const result = await aiService.generateCoverLetter({
      resumeData: resumeData || {},
      company,
      jobTitle,
      jobDescription,
      tone: tone || 'professional',
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI Interview Prep Questions
// @route   POST /api/ai/interview-prep
// @access  Private
const getInterviewPrep = async (req, res, next) => {
  try {
    const { role, experience, skills, company, jobDescription } = req.body;
    const result = await aiService.interviewPrep({
      role: role || 'Full Stack Developer',
      experience,
      skills,
      company,
      jobDescription,
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Evaluate Candidate's Interview Answer
// @route   POST /api/ai/evaluate-answer
// @access  Private
const evaluateAnswer = async (req, res, next) => {
  try {
    const { question, answer, role } = req.body;
    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: 'Both question and answer are required for evaluation.',
      });
    }

    const result = await aiService.evaluateInterviewAnswer({ question, answer, role });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate Full Initial Resume (Onboarding Wizard)
// @route   POST /api/ai/generate-initial-resume
// @access  Private
const generateInitialResume = async (req, res, next) => {
  try {
    const { targetRole, experienceYears, skills, jobDescription } = req.body;
    const result = await aiService.generateInitialResume({
      targetRole: targetRole || 'Full Stack Developer',
      experienceYears: experienceYears || '2',
      skills: skills || [],
      jobDescription,
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateSummary,
  improveBullet,
  generateSkills,
  analyzeResume,
  tailorResume,
  generateCoverLetter,
  getInterviewPrep,
  evaluateAnswer,
  generateInitialResume,
};
