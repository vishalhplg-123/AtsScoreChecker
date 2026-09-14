// Advanced ATS Scoring and Analysis Engine

const ACTION_VERBS = [
  'built', 'developed', 'engineered', 'implemented', 'designed', 'architected',
  'optimized', 'scaled', 'accelerated', 'reduced', 'increased', 'improved',
  'spearheaded', 'orchestrated', 'led', 'mentored', 'collaborated', 'created',
  'automated', 'delivered', 'launched', 'migrated', 'streamlined', 'integrated',
  'secured', 'deployed', 'monitored', 'refactored', 'debugged', 'managed'
];

const COMMON_TECH_KEYWORDS = [
  'javascript', 'typescript', 'react', 'react.js', 'node.js', 'nodejs', 'express',
  'express.js', 'mongodb', 'sql', 'postgresql', 'mysql', 'docker', 'kubernetes',
  'aws', 'azure', 'gcp', 'git', 'github', 'ci/cd', 'rest api', 'graphql', 'html',
  'css', 'tailwind', 'redux', 'next.js', 'nextjs', 'vue', 'angular', 'python',
  'django', 'flask', 'fastapi', 'java', 'spring boot', 'c#', '.net', 'c++', 'go',
  'golang', 'redis', 'kafka', 'microservices', 'agile', 'scrum', 'unit testing',
  'jest', 'cypress', 'linux', 'oauth', 'jwt', 'prisma', 'orm', 'nosql'
];

const extractKeywordsFromText = (text) => {
  if (!text) return [];
  const lower = text.toLowerCase();
  const words = lower.match(/[a-zA-Z0-9#+.-]+/g) || [];
  
  // Look for known keywords
  const matched = new Set();
  COMMON_TECH_KEYWORDS.forEach(kw => {
    if (lower.includes(kw)) {
      matched.add(kw);
    }
  });

  // Also collect 4+ letter words with reasonable frequency
  const frequencyMap = {};
  words.forEach(w => {
    if (w.length > 3 && !['with', 'from', 'have', 'this', 'that', 'they', 'their', 'will', 'been', 'were', 'about', 'which'].includes(w)) {
      frequencyMap[w] = (frequencyMap[w] || 0) + 1;
    }
  });

  Object.entries(frequencyMap)
    .filter(([_, count]) => count >= 2)
    .slice(0, 20)
    .forEach(([word]) => matched.add(word));

  return Array.from(matched);
};

const extractResumeAllText = (resume) => {
  const parts = [];
  if (resume.personalInfo?.fullName) parts.push(resume.personalInfo.fullName);
  if (resume.personalInfo?.jobTitle) parts.push(resume.personalInfo.jobTitle);
  if (resume.summary) parts.push(resume.summary);

  if (Array.isArray(resume.experience)) {
    resume.experience.forEach(exp => {
      if (exp.company) parts.push(exp.company);
      if (exp.position) parts.push(exp.position);
      if (Array.isArray(exp.bullets)) parts.push(...exp.bullets);
    });
  }

  if (Array.isArray(resume.skills)) {
    resume.skills.forEach(cat => {
      if (cat.category) parts.push(cat.category);
      if (Array.isArray(cat.items)) parts.push(...cat.items);
    });
  }

  if (Array.isArray(resume.projects)) {
    resume.projects.forEach(proj => {
      if (proj.title) parts.push(proj.title);
      if (Array.isArray(proj.bullets)) parts.push(...proj.bullets);
      if (Array.isArray(proj.technologies)) parts.push(...proj.technologies);
    });
  }

  if (Array.isArray(resume.education)) {
    resume.education.forEach(edu => {
      if (edu.institution) parts.push(edu.institution);
      if (edu.degree) parts.push(edu.degree);
      if (edu.fieldOfStudy) parts.push(edu.fieldOfStudy);
    });
  }

  if (Array.isArray(resume.certifications)) {
    resume.certifications.forEach(cert => {
      if (cert.name) parts.push(cert.name);
      if (cert.issuer) parts.push(cert.issuer);
    });
  }

  return parts.join(' ');
};

const analyzeResumeATS = (resume, jobDescription = '') => {
  const resumeText = extractResumeAllText(resume);
  const lowerResume = resumeText.toLowerCase();

  // 1. Keyword & Skills Matching
  let targetKeywords = [];
  if (jobDescription && jobDescription.trim().length > 10) {
    targetKeywords = extractKeywordsFromText(jobDescription);
  } else {
    // Default to extracted targetRole skills
    targetKeywords = extractKeywordsFromText(resume.targetRole || 'Full Stack Developer React Node.js MongoDB');
    if (targetKeywords.length < 6) {
      targetKeywords = ['react', 'node.js', 'javascript', 'mongodb', 'express', 'rest api', 'git', 'docker'];
    }
  }

  const matchedKeywords = [];
  const missingKeywords = [];

  targetKeywords.forEach(kw => {
    if (lowerResume.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const keywordMatchScore = targetKeywords.length > 0 
    ? Math.min(100, Math.round((matchedKeywords.length / targetKeywords.length) * 100))
    : 80;

  // 2. Action Verbs & Measurable Metrics in Bullets
  let totalBullets = 0;
  let actionVerbBullets = 0;
  let quantifiedBullets = 0;

  const checkBullet = (bullet) => {
    if (!bullet || bullet.trim().length < 5) return;
    totalBullets++;
    const bLower = bullet.toLowerCase();
    
    // Check action verbs
    const hasActionVerb = ACTION_VERBS.some(verb => bLower.startsWith(verb) || bLower.includes(` ${verb} `));
    if (hasActionVerb) actionVerbBullets++;

    // Check quantifiable metric (%, $, numbers, x, ms, k)
    const hasMetric = /(\d+[%kKmM]?|\$\d+|\b\d+\b|\b[0-9]+x\b)/.test(bullet);
    if (hasMetric) quantifiedBullets++;
  };

  if (Array.isArray(resume.experience)) {
    resume.experience.forEach(exp => {
      if (Array.isArray(exp.bullets)) exp.bullets.forEach(checkBullet);
    });
  }

  if (Array.isArray(resume.projects)) {
    resume.projects.forEach(proj => {
      if (Array.isArray(proj.bullets)) proj.bullets.forEach(checkBullet);
    });
  }

  const actionVerbRatio = totalBullets > 0 ? (actionVerbBullets / totalBullets) : 0.5;
  const quantifiedRatio = totalBullets > 0 ? (quantifiedBullets / totalBullets) : 0.4;
  const experienceScore = Math.min(100, Math.round((actionVerbRatio * 50) + (quantifiedRatio * 50)));

  // 3. Skills Section Density
  let totalSkills = 0;
  if (Array.isArray(resume.skills)) {
    resume.skills.forEach(cat => {
      if (Array.isArray(cat.items)) totalSkills += cat.items.length;
    });
  }
  const skillsScore = totalSkills >= 12 ? 95 : totalSkills >= 8 ? 85 : totalSkills >= 4 ? 70 : 50;

  // 4. Formatting & Structure
  let formattingScore = 100;
  const formattingIssues = [];

  if (!resume.personalInfo?.fullName) {
    formattingScore -= 15;
    formattingIssues.push('Full name is missing from contact header.');
  }
  if (!resume.personalInfo?.email || !resume.personalInfo?.email.includes('@')) {
    formattingScore -= 15;
    formattingIssues.push('Valid email address is missing.');
  }
  if (!resume.personalInfo?.phone) {
    formattingScore -= 10;
    formattingIssues.push('Phone number is missing.');
  }
  if (!resume.personalInfo?.linkedin && !resume.personalInfo?.github) {
    formattingScore -= 5;
    formattingIssues.push('Adding a LinkedIn or GitHub profile link boosts ATS recruiter verification.');
  }
  if (!resume.education || resume.education.length === 0) {
    formattingScore -= 10;
    formattingIssues.push('Education section is empty.');
  }
  if (!resume.experience || resume.experience.length === 0) {
    formattingScore -= 15;
    formattingIssues.push('Experience section is empty.');
  }

  // 5. Summary Quality
  let summaryScore = 80;
  const summaryIssues = [];
  if (!resume.summary || resume.summary.trim().length === 0) {
    summaryScore = 40;
    summaryIssues.push('Professional summary is missing. Recruiters prioritize a 2-4 sentence hook.');
  } else if (resume.summary.length < 60) {
    summaryScore = 65;
    summaryIssues.push('Summary is too short. Include your core domain, years of experience, and top skills.');
  } else if (resume.summary.length > 500) {
    summaryScore = 75;
    summaryIssues.push('Summary is too long. Condense to 3-4 impactful sentences for better readability.');
  }

  // Weighted Overall ATS Score
  const overallScore = Math.round(
    keywordMatchScore * 0.35 +
    experienceScore * 0.25 +
    skillsScore * 0.15 +
    formattingScore * 0.15 +
    summaryScore * 0.10
  );

  // Generate actionable recommendations
  const recommendations = [];

  if (missingKeywords.length > 0) {
    recommendations.push({
      category: 'Keywords',
      priority: 'high',
      title: `Add ${Math.min(4, missingKeywords.length)} High-Value Missing Keywords`,
      description: `Incorporate key terms like ${missingKeywords.slice(0, 4).map(k => `"${k}"`).join(', ')} in your skills, summary, or project descriptions.`,
      action: 'add_keywords',
    });
  }

  if (quantifiedRatio < 0.6) {
    recommendations.push({
      category: 'Experience & Impact',
      priority: 'high',
      title: 'Quantify Your Bullet Points with Measurable Metrics',
      description: `Only ${Math.round(quantifiedRatio * 100)}% of your bullet points contain measurable metrics (%, $, latency, scale). Use the AI "Make Achievement-focused" tool to add impact.`,
      action: 'improve_bullets',
    });
  }

  if (actionVerbRatio < 0.7) {
    recommendations.push({
      category: 'Action Verbs',
      priority: 'medium',
      title: 'Begin Bullet Points with Strong Action Verbs',
      description: 'Start every bullet point with verbs like "Engineered", "Spearheaded", "Optimized", or "Scaled" instead of passive duties.',
      action: 'action_verbs',
    });
  }

  if (formattingIssues.length > 0) {
    recommendations.push({
      category: 'Structure & Formatting',
      priority: 'medium',
      title: 'Complete Required Contact & Resume Sections',
      description: formattingIssues.join(' '),
      action: 'fix_formatting',
    });
  }

  if (summaryIssues.length > 0) {
    recommendations.push({
      category: 'Summary',
      priority: 'medium',
      title: 'Optimize Professional Summary',
      description: summaryIssues.join(' '),
      action: 'fix_summary',
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      category: 'Optimization',
      priority: 'low',
      title: 'Outstanding ATS Optimization!',
      description: 'Your resume meets the highest standard for ATS parseability, keyword density, and measurable impact.',
      action: 'none',
    });
  }

  return {
    overallScore,
    scores: {
      keywordMatch: keywordMatchScore,
      experienceRelevance: experienceScore,
      skillsMatch: skillsScore,
      formattingQuality: Math.max(0, formattingScore),
      summaryQuality: summaryScore,
    },
    metrics: {
      totalBullets,
      actionVerbBullets,
      quantifiedBullets,
      totalSkills,
      matchedCount: matchedKeywords.length,
      missingCount: missingKeywords.length,
    },
    matchedKeywords: matchedKeywords.slice(0, 25),
    missingKeywords: missingKeywords.slice(0, 15),
    recommendations,
    atsReadability: formattingScore >= 80 ? 'Excellent (100% Parseable)' : 'Moderate (Action Recommended)',
  };
};

module.exports = {
  analyzeResumeATS,
  extractKeywordsFromText,
  extractResumeAllText,
  ACTION_VERBS,
  COMMON_TECH_KEYWORDS,
};
