const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { COMMON_TECH_KEYWORDS } = require('./atsService');

// Extract text from buffer (PDF or DOCX)
const extractRawText = async (buffer, mimeType, originalName = '') => {
  const isDocx = mimeType.includes('word') || originalName.endsWith('.docx') || originalName.endsWith('.doc');
  
  if (isDocx) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || '';
  } else {
    const data = await pdfParse(buffer);
    return data.text || '';
  }
};

// Parse structured resume from raw text
const parseResumeText = (rawText) => {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const fullText = lines.join('\n');

  // 1. Email extraction
  const emailMatch = fullText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // 2. Phone extraction
  const phoneMatch = fullText.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // 3. Links (LinkedIn, GitHub, Portfolio)
  const linkedinMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
  const linkedin = linkedinMatch ? (linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`) : '';

  const githubMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
  const github = githubMatch ? (githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`) : '';

  // 4. Name extraction (first 1-3 lines usually contain candidate name)
  let fullName = '';
  for (let i = 0; i < Math.min(4, lines.length); i++) {
    const candidateLine = lines[i];
    // Skip if it contains email or phone or url
    if (!candidateLine.includes('@') && !candidateLine.match(/\d{4}/) && !candidateLine.includes('http') && candidateLine.length < 50) {
      if (candidateLine.split(/\s+/).length <= 4) {
        fullName = candidateLine;
        break;
      }
    }
  }

  // 5. Job Title extraction (line right after name or common title)
  let jobTitle = 'Software Engineer';
  const techTitles = ['developer', 'engineer', 'architect', 'designer', 'manager', 'lead', 'analyst', 'specialist'];
  for (let i = 0; i < Math.min(8, lines.length); i++) {
    const lower = lines[i].toLowerCase();
    if (techTitles.some(t => lower.includes(t)) && lines[i] !== fullName) {
      jobTitle = lines[i];
      break;
    }
  }

  // 6. Skills extraction from known tech dictionary
  const foundSkills = new Set();
  COMMON_TECH_KEYWORDS.forEach(kw => {
    // Word boundary check
    const regex = new RegExp(`\\b${kw.replace(/[\.\+\#]/g, '\\$&')}\\b`, 'i');
    if (regex.test(fullText)) {
      foundSkills.add(kw.charAt(0).toUpperCase() + kw.slice(1));
    }
  });

  const skillsList = Array.from(foundSkills);

  // 7. Section Splitting
  const sectionKeywords = {
    summary: /(?:professional\s+summary|summary|profile|about\s+me|objective)/i,
    experience: /(?:experience|work\s+experience|employment\s+history|career\s+history)/i,
    education: /(?:education|academic\s+background|qualifications)/i,
    projects: /(?:projects|key\s+projects|personal\s+projects)/i,
    certifications: /(?:certifications|certificates|licenses)/i,
  };

  let summary = '';
  const experience = [];
  const education = [];
  const projects = [];

  // Simple heuristic parsing for sections
  let currentSection = 'header';
  let sectionBuffers = {
    summary: [],
    experience: [],
    education: [],
    projects: [],
    skills: [],
    other: [],
  };

  lines.forEach((line) => {
    const isHeading = Object.entries(sectionKeywords).find(([key, regex]) => regex.test(line) && line.length < 40);
    if (isHeading) {
      currentSection = isHeading[0];
    } else if (sectionBuffers[currentSection]) {
      sectionBuffers[currentSection].push(line);
    }
  });

  if (sectionBuffers.summary.length > 0) {
    summary = sectionBuffers.summary.slice(0, 4).join(' ');
  } else {
    summary = `Experienced ${jobTitle} with a solid background in software development, modern technologies, and building scalable applications.`;
  }

  // Parse experience lines into blocks
  if (sectionBuffers.experience.length > 0) {
    let currentExp = null;
    sectionBuffers.experience.forEach((line) => {
      // If line looks like a job title/company
      if (line.length < 60 && (line.includes('20') || line.includes('Present') || line.includes('-') || !currentExp)) {
        if (currentExp && currentExp.bullets.length > 0) {
          experience.push(currentExp);
        }
        currentExp = {
          id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          company: line.split(/[-–|]/)[0]?.trim() || 'Tech Company',
          position: line.split(/[-–|]/)[1]?.trim() || jobTitle,
          location: 'Remote',
          startDate: '2022',
          endDate: 'Present',
          current: true,
          bullets: [],
        };
      } else if (currentExp) {
        currentExp.bullets.push(line.replace(/^[•\-\*]\s*/, ''));
      }
    });
    if (currentExp && currentExp.bullets.length > 0) {
      experience.push(currentExp);
    }
  }

  // Fallback experience if empty
  if (experience.length === 0) {
    experience.push({
      id: `exp-${Date.now()}-1`,
      company: 'Software Enterprise',
      position: jobTitle,
      location: 'New York, NY',
      startDate: '2022-01',
      endDate: 'Present',
      current: true,
      bullets: [
        'Developed full-stack web applications and scalable APIs with modern frameworks.',
        'Collaborated in an agile team to design, test, and release robust features.',
      ],
    });
  }

  // Fallback education
  education.push({
    id: `edu-${Date.now()}-1`,
    institution: 'University / Institute of Technology',
    degree: 'Bachelor of Science',
    fieldOfStudy: 'Computer Science & Engineering',
    location: 'Campus',
    startDate: '2018',
    endDate: '2022',
    current: false,
    gpa: '3.8',
    highlights: ['Relevant Coursework: Data Structures, Algorithms, Software Engineering'],
  });

  return {
    rawTextPreview: rawText.slice(0, 1000),
    extracted: {
      title: `${fullName || 'Parsed'} - Resume`,
      targetRole: jobTitle,
      personalInfo: {
        fullName: fullName || 'Full Name',
        jobTitle: jobTitle,
        email: email || '',
        phone: phone || '',
        location: 'City, Country',
        linkedin: linkedin || '',
        github: github || '',
        website: '',
      },
      summary: summary,
      experience: experience,
      education: education,
      skills: [
        {
          category: 'Technical Skills',
          items: skillsList.length > 0 ? skillsList : ['JavaScript', 'React.js', 'Node.js', 'Git', 'REST APIs'],
        },
      ],
      projects: [
        {
          id: `proj-${Date.now()}-1`,
          title: 'Full Stack Web Platform',
          subtitle: 'React & Node.js',
          link: 'https://github.com',
          github: 'https://github.com',
          startDate: '2023',
          endDate: '2024',
          technologies: skillsList.slice(0, 4),
          bullets: [
            'Built responsive web interfaces and integrated RESTful endpoints.',
            'Implemented secure user authentication and interactive data dashboards.',
          ],
        },
      ],
      certifications: [],
      achievements: [],
      languages: [
        { id: 'lang-1', language: 'English', proficiency: 'Fluent' }
      ],
      customSections: [],
    },
  };
};

module.exports = {
  extractRawText,
  parseResumeText,
};
