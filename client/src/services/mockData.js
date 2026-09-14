// Offline / Demo Fallback Data for ResumeAI Client

export const initialMockResumes = [
  {
    _id: 'resume-101',
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
    ],
    certifications: [
      {
        id: 'cert-101',
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        issueDate: '2023',
        credentialId: 'AWS-8934201',
        url: 'https://aws.amazon.com/verification',
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
    atsScore: 94,
    lastAtsAnalysis: {
      overallScore: 94,
      scores: {
        keywordMatch: 95,
        experienceRelevance: 92,
        skillsMatch: 96,
        formattingQuality: 98,
        summaryQuality: 88,
      },
      matchedKeywords: ['react', 'node.js', 'mongodb', 'docker', 'aws', 'typescript', 'rest api'],
      missingKeywords: ['graphql', 'kubernetes'],
      recommendations: [
        {
          category: 'Keywords',
          priority: 'low',
          title: 'High ATS Match Score!',
          description: 'Your resume demonstrates strong keyword density and quantifiable achievements.',
        },
      ],
    },
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'resume-102',
    title: 'Frontend React Specialist (Developer Template)',
    targetRole: 'Senior Frontend Developer',
    template: 'developer',
    customization: {
      accentColor: '#059669',
      fontFamily: 'jetbrains',
      fontSize: 'medium',
      lineSpacing: 'normal',
      margins: 'normal',
      sectionOrder: ['personalInfo', 'summary', 'skills', 'experience', 'projects', 'education'],
      hiddenSections: [],
    },
    personalInfo: {
      fullName: 'Vishal Kumar',
      jobTitle: 'Frontend React & Next.js Architect',
      email: 'vishal.dev@example.com',
      phone: '+91 98765 43210',
      location: 'Bengaluru, India',
      linkedin: 'https://linkedin.com/in/vishalkumar-dev',
      github: 'https://github.com/vishal-kumar-dev',
      website: 'https://vishalkumar.dev',
    },
    summary:
      'Frontend Architect specializing in React.js, Next.js, and TypeScript. Expert in web performance optimization, Core Web Vitals, and building accessible enterprise UI design systems.',
    experience: [],
    education: [],
    skills: [
      {
        category: 'Languages & UI',
        items: ['TypeScript', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'HTML5'],
      },
    ],
    projects: [],
    certifications: [],
    atsScore: 92,
    updatedAt: new Date().toISOString(),
  },
];

export const initialMockJobs = [
  {
    _id: 'job-1',
    company: 'Stripe',
    position: 'Staff Full Stack Engineer',
    location: 'Remote, US/India',
    salary: '$180,000 - $220,000',
    jobUrl: 'https://stripe.com/jobs',
    status: 'wishlist',
    dateApplied: new Date().toISOString(),
    notes: 'Payment infrastructure team.',
  },
  {
    _id: 'job-2',
    company: 'Google',
    position: 'Senior Frontend Engineer',
    location: 'Bengaluru / Hybrid',
    salary: '₹55,00,000 / yr',
    jobUrl: 'https://careers.google.com',
    status: 'applied',
    dateApplied: new Date().toISOString(),
    notes: 'Referred by alumni.',
  },
  {
    _id: 'job-3',
    company: 'Meta',
    position: 'Software Engineer III (Core Web)',
    location: 'London / Remote',
    salary: '£110,000',
    jobUrl: 'https://metacareers.com',
    status: 'screening',
    dateApplied: new Date().toISOString(),
    notes: 'Phone screening scheduled.',
  },
  {
    _id: 'job-4',
    company: 'Amazon Web Services (AWS)',
    position: 'Senior SDE II - Cloud Platforms',
    location: 'Bengaluru',
    salary: '₹62,00,000',
    jobUrl: 'https://amazon.jobs',
    status: 'interview',
    dateApplied: new Date().toISOString(),
    notes: 'Technical loop next week.',
  },
  {
    _id: 'job-5',
    company: 'Microsoft',
    position: 'Senior MERN Specialist',
    location: 'Hyderabad / Hybrid',
    jobUrl: 'https://careers.microsoft.com',
    status: 'offer',
    dateApplied: new Date().toISOString(),
    notes: 'Offer letter received!',
  },
];

export const initialMockLetters = [
  {
    _id: 'cl-1',
    title: 'Stripe - Staff Full Stack Engineer Cover Letter',
    recipient: { company: 'Stripe', name: 'Hiring Team' },
    jobTitle: 'Staff Full Stack Engineer',
    jobDescription: 'Leading architecture for global payments infrastructure.',
    tone: 'professional',
    content: `Dear Hiring Team at Stripe,

I am writing to express my enthusiastic interest in the Staff Full Stack Engineer position at Stripe. With over 4 years of hands-on experience designing and scaling high-availability web platforms, optimizing distributed microservices, and leading full-stack engineering initiatives, I am eager to contribute to Stripe's mission of increasing the GDP of the internet.

In my recent work, I architected a multi-tenant SaaS application serving over 120,000 monthly active users while reducing p99 API response times by 42%. My core expertise spanning React, Node.js, TypeScript, and cloud infrastructure aligns directly with the high-performance standards required for Stripe's payments platform.

I would welcome the opportunity to discuss how my technical leadership and background can create immediate impact on your team. Thank you for your time and consideration.

Sincerely,
Vishal Kumar`,
    createdAt: new Date().toISOString(),
  },
];
