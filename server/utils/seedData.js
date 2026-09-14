const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User');
const Resume = require('../models/Resume');
const JobApplication = require('../models/JobApplication');
const CoverLetter = require('../models/CoverLetter');
const { analyzeResumeATS } = require('../services/atsService');
const config = require('../config/config');

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(config.mongoUri);
    console.log('[Seed] Connected to MongoDB');

    // Clean existing records for seed user
    const existingUser = await User.findOne({ email: 'vishal@example.com' });
    if (existingUser) {
      await Resume.deleteMany({ userId: existingUser._id });
      await JobApplication.deleteMany({ userId: existingUser._id });
      await CoverLetter.deleteMany({ userId: existingUser._id });
      await User.deleteOne({ _id: existingUser._id });
      console.log('[Seed] Cleaned previous demo data.');
    }

    // 1. Create Demo User
    const demoUser = await User.create({
      name: 'Vishal Kumar',
      email: 'vishal@example.com',
      password: 'password123',
      headline: 'MERN Stack & Full Stack AI Developer',
      targetRole: 'Senior Full Stack Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      preferences: {
        defaultTemplate: 'modern',
        theme: 'light',
      },
    });

    console.log(`[Seed] Demo User created: ${demoUser.email} (Password: password123)`);

    // 2. Create Primary Full-Stack Resume
    const resume1Data = {
      userId: demoUser._id,
      title: 'Senior MERN Stack Engineer (ATS Optimized)',
      targetRole: 'Senior Full Stack Developer',
      template: 'modern',
      customization: {
        accentColor: '#2563eb',
        fontFamily: 'inter',
        fontSize: 'medium',
        lineSpacing: 'normal',
        margins: 'normal',
        sectionOrder: [
          'personalInfo',
          'summary',
          'experience',
          'projects',
          'skills',
          'education',
          'certifications',
          'achievements',
          'languages',
        ],
        hiddenSections: [],
      },
      personalInfo: {
        fullName: 'Vishal Kumar',
        jobTitle: 'Senior MERN Stack Developer',
        email: 'vishal.dev@example.com',
        phone: '+91 98765 43210',
        location: 'Bengaluru, India',
        linkedin: 'https://linkedin.com/in/vishalkumar-dev',
        github: 'https://github.com/vishal-kumar-dev',
        website: 'https://vishalkumar.dev',
      },
      summary:
        'Innovative Full Stack Developer with 4+ years of hands-on experience architecting high-traffic SaaS applications, microservices, and modern web platforms. Proven track record of reducing API latency by 42%, spearheading cloud deployments on AWS/Docker, and mentoring engineering teams in clean code and React/Node best practices.',
      experience: [
        {
          id: 'exp-101',
          company: 'CloudScale Technologies',
          position: 'Senior MERN Developer',
          location: 'Bengaluru, India',
          startDate: '2022-04',
          endDate: 'Present',
          current: true,
          bullets: [
            'Architected and deployed a multi-tenant SaaS application serving 120,000+ monthly active users with 99.98% uptime.',
            'Optimized MongoDB indexing and Express.js middleware, reducing p99 API response times from 420ms to 85ms.',
            'Engineered real-time collaboration canvas using WebSockets and Redis pub/sub, scaling concurrent connections by 300%.',
            'Implemented automated CI/CD pipelines via GitHub Actions and Docker, reducing release cycle time from 4 days to 45 minutes.',
          ],
        },
        {
          id: 'exp-102',
          company: 'HyperGrowth Media Labs',
          position: 'Full Stack Engineer',
          location: 'Remote',
          startDate: '2020-07',
          endDate: '2022-03',
          current: false,
          bullets: [
            'Developed 15+ responsive React/Redux user interfaces with Tailwind CSS, improving mobile Core Web Vitals to 96+.',
            'Integrated Stripe payment processing and webhook reconciliation handling $2.4M in annualized transactions.',
            'Spearheaded transition to TypeScript and Jest unit tests, achieving 88% test coverage and decreasing regression bugs by 35%.',
          ],
        },
      ],
      education: [
        {
          id: 'edu-101',
          institution: 'National Institute of Technology',
          degree: 'Bachelor of Technology',
          fieldOfStudy: 'Computer Science and Engineering',
          location: 'India',
          startDate: '2016',
          endDate: '2020',
          current: false,
          gpa: '8.8 / 10.0',
          highlights: ['President of Coding Club', '1st Place in National Smart City Hackathon 2019'],
        },
      ],
      skills: [
        {
          category: 'Frontend & UI',
          items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Redux Toolkit', 'HTML5/CSS3'],
        },
        {
          category: 'Backend & APIs',
          items: ['Node.js', 'Express.js', 'RESTful APIs', 'GraphQL', 'WebSockets', 'Microservices Architecture'],
        },
        {
          category: 'Database & Cloud',
          items: ['MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'AWS (S3, EC2)', 'Git & GitHub', 'CI/CD Pipelines'],
        },
        {
          category: 'Core Competencies',
          items: ['System Design', 'Performance Optimization', 'Agile/Scrum', 'Test-Driven Development (Jest/Vitest)'],
        },
      ],
      projects: [
        {
          id: 'proj-101',
          title: 'ResumeAI - AI Career & Resume Builder',
          subtitle: 'Full-Stack SaaS Platform',
          link: 'https://resumeai-demo.com',
          github: 'https://github.com/vishal-kumar-dev/resume-ai',
          startDate: '2024-01',
          endDate: '2024-04',
          technologies: ['React', 'Node.js', 'MongoDB', 'OpenAI API', 'Tailwind CSS'],
          bullets: [
            'Built complete ATS resume scoring algorithm and multi-section real-time editor with 6 exportable templates.',
            'Integrated OpenAI API with hybrid fallback engine for bullet optimization, cover letter generation, and mock interview prep.',
          ],
        },
        {
          id: 'proj-102',
          title: 'Real-Time Fleet Dispatch Platform',
          subtitle: 'Distributed Uber Clone',
          link: 'https://fleetdispatch.live',
          github: 'https://github.com/vishal-kumar-dev/uber-clone',
          startDate: '2023-05',
          endDate: '2023-09',
          technologies: ['React Native', 'Node.js', 'Socket.io', 'MongoDB', 'Redis Geospatial'],
          bullets: [
            'Engineered driver-passenger matching algorithm processing sub-second geospatial queries across 10,000+ simulated nodes.',
            'Integrated interactive Mapbox live tracking and automated push notifications.',
          ],
        },
      ],
      certifications: [
        {
          id: 'cert-101',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services',
          issueDate: '2023',
          expiryDate: '2026',
          credentialId: 'AWS-8934201',
          url: 'https://aws.amazon.com/verification',
        },
        {
          id: 'cert-102',
          name: 'MongoDB Certified Developer Associate',
          issuer: 'MongoDB Inc.',
          issueDate: '2022',
          credentialId: 'MDB-DEV-7712',
          url: 'https://learn.mongodb.com',
        },
      ],
      achievements: [
        {
          id: 'ach-1',
          title: 'Top Performer Award 2023',
          description: 'Awarded annual top contributor badge at CloudScale for leading core platform rewrite.',
          date: 'Dec 2023',
        },
      ],
      languages: [
        { id: 'lang-1', language: 'English', proficiency: 'Fluent (Professional)' },
        { id: 'lang-2', language: 'Hindi', proficiency: 'Native' },
      ],
      customSections: [],
      isPublic: true,
      shareId: 'vishal-kumar-mern-lead',
    };

    const ats1 = analyzeResumeATS(resume1Data);
    resume1Data.atsScore = ats1.overallScore;
    resume1Data.lastAtsAnalysis = ats1;

    const resume1 = await Resume.create(resume1Data);

    // 2b. Create Secondary Developer Template Resume
    const resume2Data = {
      ...resume1Data,
      title: 'Frontend Specialist (Developer Template)',
      targetRole: 'Senior React Developer',
      template: 'developer',
      customization: {
        ...resume1Data.customization,
        accentColor: '#059669', // Emerald
        fontFamily: 'jetbrains',
      },
    };
    const ats2 = analyzeResumeATS(resume2Data);
    resume2Data.atsScore = ats2.overallScore;
    resume2Data.lastAtsAnalysis = ats2;
    const resume2 = await Resume.create(resume2Data);

    // 2c. Create Executive Template Resume
    const resume3Data = {
      ...resume1Data,
      title: 'Lead Software Architect (Executive Template)',
      targetRole: 'Lead Software Architect',
      template: 'executive',
      customization: {
        ...resume1Data.customization,
        accentColor: '#7c3aed', // Violet
        fontFamily: 'merriweather',
      },
    };
    const ats3 = analyzeResumeATS(resume3Data);
    resume3Data.atsScore = ats3.overallScore;
    resume3Data.lastAtsAnalysis = ats3;
    const resume3 = await Resume.create(resume3Data);

    console.log('[Seed] 3 Demo Resumes created successfully.');

    // 3. Create Demo Job Applications (Kanban)
    const jobs = [
      {
        userId: demoUser._id,
        company: 'Stripe',
        position: 'Staff Full Stack Engineer',
        location: 'Remote, US/EU/India',
        salary: '$180,000 - $220,000',
        jobUrl: 'https://stripe.com/jobs',
        status: 'wishlist',
        dateApplied: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
        resumeUsed: resume1._id,
        notes: 'Targeting payment infrastructure team. Great tech stack with TypeScript & Ruby.',
      },
      {
        userId: demoUser._id,
        company: 'Google',
        position: 'Senior Frontend Engineer',
        location: 'Bengaluru / Hybrid',
        salary: '₹55,000,000 / yr',
        jobUrl: 'https://careers.google.com',
        status: 'applied',
        dateApplied: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        resumeUsed: resume2._id,
        notes: 'Referred by alumni. Prepared system design notes.',
      },
      {
        userId: demoUser._id,
        company: 'Meta',
        position: 'Software Engineer III (Core Web)',
        location: 'London / Remote',
        salary: '£110,000',
        jobUrl: 'https://metacareers.com',
        status: 'screening',
        dateApplied: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
        resumeUsed: resume1._id,
        notes: 'Recruiter phone screening scheduled for this Thursday at 4 PM.',
      },
      {
        userId: demoUser._id,
        company: 'Amazon Web Services (AWS)',
        position: 'Senior SDE II - Cloud Platforms',
        location: 'Bengaluru',
        salary: '₹62,00,000',
        jobUrl: 'https://amazon.jobs',
        status: 'interview',
        dateApplied: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
        resumeUsed: resume1._id,
        notes: 'Cleared technical round 1 on Distributed Systems. Loop round scheduled next week.',
      },
      {
        userId: demoUser._id,
        company: 'Microsoft',
        position: 'Senior MERN / Cloud Engineer',
        location: 'Hyderabad / Hybrid',
        salary: '₹58,00,000',
        jobUrl: 'https://careers.microsoft.com',
        status: 'offer',
        dateApplied: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25),
        resumeUsed: resume3._id,
        notes: 'Official offer letter received! Benefits review underway.',
      },
    ];

    await JobApplication.insertMany(jobs);
    console.log(`[Seed] ${jobs.length} Demo Job Applications created in Kanban.`);

    // 4. Create Demo Cover Letter
    await CoverLetter.create({
      userId: demoUser._id,
      title: 'Google - Senior Frontend Engineer Cover Letter',
      recipient: {
        name: 'Google Engineering Hiring Committee',
        company: 'Google',
        title: 'Lead Technical Recruiter',
        address: 'Mountain View, CA / Bengaluru',
      },
      jobTitle: 'Senior Frontend Engineer',
      jobDescription: 'Build next-generation web applications with React, TypeScript, and high-performance frontend architecture.',
      tone: 'confident',
      resumeUsed: resume2._id,
      content: `Dear Google Engineering Hiring Committee,

I am writing to express my enthusiastic interest in the Senior Frontend Engineer position at Google. Having spent over 4 years designing high-throughput, latency-critical web applications and modern interactive interfaces, I have long admired Google's relentless pursuit of web performance and accessibility standards.

At CloudScale Technologies, I architected user-facing SaaS platforms serving over 120,000 active users, driving Core Web Vitals to 96+ and cutting bundle latency by 42%. My technical expertise in React.js, TypeScript, and state synchronization directly aligns with Google's mission to deliver seamless, world-class experiences across global networks.

What excites me most about this opportunity is the chance to collaborate with world-class engineers on scalable problems. I thrive in high-rigor environments where automated testing, code quality, and proactive mentorship are standard.

Thank you for your consideration. I look forward to discussing how my experience in frontend engineering and technical leadership can support Google's upcoming product roadmaps.

Sincerely,
Vishal Kumar`,
    });

    console.log('[Seed] Demo Cover Letter created.');
    console.log('[Seed] Database seeding completed successfully! ✨');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
