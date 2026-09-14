const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Resume title is required'],
      default: 'Untitled Resume',
      trim: true,
    },
    targetRole: {
      type: String,
      default: '',
      trim: true,
    },
    template: {
      type: String,
      enum: ['classic', 'modern', 'minimal', 'developer', 'professional', 'executive'],
      default: 'modern',
    },
    customization: {
      accentColor: {
        type: String,
        default: '#2563eb', // Blue
      },
      fontFamily: {
        type: String,
        default: 'inter', // inter, merriweather, roboto, jetbrains
      },
      fontSize: {
        type: String,
        default: 'medium', // small, medium, large
      },
      lineSpacing: {
        type: String,
        default: 'normal', // compact, normal, relaxed
      },
      margins: {
        type: String,
        default: 'normal', // compact, normal, spacious
      },
      sectionOrder: {
        type: [String],
        default: [
          'personalInfo',
          'summary',
          'experience',
          'projects',
          'skills',
          'education',
          'certifications',
          'achievements',
          'languages',
          'customSections',
        ],
      },
      hiddenSections: {
        type: [String],
        default: [],
      },
    },
    personalInfo: {
      fullName: { type: String, default: '' },
      jobTitle: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      location: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      website: { type: String, default: '' },
      avatar: { type: String, default: '' },
    },
    summary: {
      type: String,
      default: '',
    },
    experience: [
      {
        id: { type: String },
        company: { type: String, default: '' },
        position: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        bullets: [{ type: String }],
      },
    ],
    education: [
      {
        id: { type: String },
        institution: { type: String, default: '' },
        degree: { type: String, default: '' },
        fieldOfStudy: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        current: { type: Boolean, default: false },
        gpa: { type: String, default: '' },
        highlights: [{ type: String }],
      },
    ],
    skills: [
      {
        category: { type: String, default: 'Technical Skills' },
        items: [{ type: String }],
      },
    ],
    projects: [
      {
        id: { type: String },
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        link: { type: String, default: '' },
        github: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        bullets: [{ type: String }],
        technologies: [{ type: String }],
      },
    ],
    certifications: [
      {
        id: { type: String },
        name: { type: String, default: '' },
        issuer: { type: String, default: '' },
        issueDate: { type: String, default: '' },
        expiryDate: { type: String, default: '' },
        credentialId: { type: String, default: '' },
        url: { type: String, default: '' },
      },
    ],
    achievements: [
      {
        id: { type: String },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        date: { type: String, default: '' },
      },
    ],
    languages: [
      {
        id: { type: String },
        language: { type: String, default: '' },
        proficiency: { type: String, default: 'Fluent' }, // Native, Fluent, Intermediate, Basic
      },
    ],
    customSections: [
      {
        id: { type: String },
        title: { type: String, default: 'Custom Section' },
        items: [
          {
            title: { type: String, default: '' },
            subtitle: { type: String, default: '' },
            date: { type: String, default: '' },
            description: { type: String, default: '' },
          },
        ],
      },
    ],
    atsScore: {
      type: Number,
      default: 0,
    },
    lastAtsAnalysis: {
      type: Object,
      default: null,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    shareId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', resumeSchema);
