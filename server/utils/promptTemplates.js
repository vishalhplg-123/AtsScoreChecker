// Standardized prompt templates for ResumeAI backend

const PROMPTS = {
  SYSTEM_RESUME_EXPERT: `You are an elite executive career coach and Certified Professional Resume Writer (CPRW). 
You specialize in modern ATS optimization, recruiter psychology, and achievement-oriented metric phrasing.
CRITICAL SAFETY & ETHICAL RULE:
- NEVER invent fake companies, false degrees, fabricated metrics, or unverifiable numbers.
- If data or metrics are missing, suggest natural phrasing or use clear placeholders like "[X% increase]" or "[team of X engineers]".
- Always output clean JSON as requested.`,

  SUMMARY_GENERATION: (targetRole, experienceLevel, skills, background) => `
Target Role: ${targetRole || 'Professional'}
Experience Level: ${experienceLevel || 'Mid-level'}
Key Skills: ${skills ? (Array.isArray(skills) ? skills.join(', ') : skills) : 'Relevant technical skills'}
Background/Context: ${background || 'Experienced professional with a strong track record of results.'}

Please generate 3 distinct high-impact professional summaries in JSON format:
1. "standard": A balanced, strong ATS-friendly professional summary.
2. "achievement": Focused on quantifiable impact and results.
3. "concise": A punchy 2-sentence summary for rapid recruiter scanning.

JSON response structure:
{
  "summaries": {
    "standard": "...",
    "achievement": "...",
    "concise": "..."
  },
  "suggestedKeywords": ["keyword1", "keyword2"]
}`,

  BULLET_IMPROVEMENT: (bullet, action, role, industry) => `
Current Bullet Point: "${bullet}"
Target Role: ${role || 'Software Engineer'}
Industry/Context: ${industry || 'Technology'}
Requested Action: ${action || 'improve'} (options: improve, make_achievement_focused, shorten, make_professional, ats_optimize)

Transform this bullet point following Google's XYZ formula ("Accomplished [X] as measured by [Y], by doing [Z]") with strong action verbs.
Do NOT invent numbers; if missing, suggest realistic phrasing with bracketed placeholders like "[improved by 35%]" or "[reduced latency by X ms]".

Provide 3 alternatives in JSON:
{
  "improved": "Best primary improvement with strong action verb",
  "achievementFocused": "Alternative emphasizing business metrics and outcomes",
  "concise": "Shorter, punchy ATS-friendly bullet",
  "explanation": "Brief 1-sentence note explaining what was enhanced",
  "actionVerbsUsed": ["Engineered", "Accelerated"]
}`,

  SKILLS_SUGGESTION: (role, jobDescription, existingSkills) => `
Target Role: ${role}
Job Description (if provided): ${jobDescription || 'None'}
Current Skills: ${existingSkills ? (Array.isArray(existingSkills) ? existingSkills.join(', ') : existingSkills) : 'None'}

Generate categorized in-demand technical, soft, and tool skills for this role in JSON:
{
  "technicalSkills": ["Skill1", "Skill2", "Skill3"],
  "frameworksAndLibraries": ["Skill4", "Skill5"],
  "toolsAndPlatforms": ["Tool1", "Tool2"],
  "softSkills": ["Skill6", "Skill7"],
  "trendingKeywords": ["Keyword1", "Keyword2"]
}`,

  COVER_LETTER: (resumeSummary, experience, jobTitle, company, jobDescription, tone) => `
Candidate Background Summary: ${resumeSummary}
Key Experiences: ${JSON.stringify(experience || [])}
Target Position: ${jobTitle}
Company Name: ${company}
Job Description: ${jobDescription || 'Standard industry requirements for ' + jobTitle}
Desired Tone: ${tone || 'professional'} (Options: professional, confident, concise, friendly)

Generate a compelling, personalized 3-4 paragraph cover letter tailored to this role and company.
Structure:
1. Hook & Opening (expressing enthusiastic interest in the specific company and role).
2. Relevant Impact & Core Alignment (highlighting 2-3 genuine achievements from the background matching JD needs).
3. Value Proposition & Culture Fit (why this candidate will accelerate company goals).
4. Confident Call-to-Action & Closing.

Return in JSON:
{
  "subjectLine": "Application for ${jobTitle} - [Candidate Name]",
  "salutation": "Dear Hiring Team at ${company},",
  "openingParagraph": "...",
  "bodyParagraphs": ["Paragraph 1 on technical/domain achievements...", "Paragraph 2 on problem solving..."],
  "closingParagraph": "...",
  "fullText": "Full formatted letter..."
}`,

  INTERVIEW_PREP: (role, experience, skills, company, jobDescription) => `
Role: ${role}
Experience Level: ${experience || 'Mid-Level'}
Skills: ${skills}
Target Company: ${company || 'Top Tech Company'}
Job Description: ${jobDescription || 'Standard tech stack requirements'}

Generate 6 realistic, highly targeted interview questions with ideal answers and evaluation criteria:
- 2 Technical Questions
- 2 Behavioral/STAR Questions
- 1 System/Architecture or Project Scenario Question
- 1 Culture/Company-specific Question

Return in JSON format:
{
  "role": "${role}",
  "company": "${company || 'Target Company'}",
  "questions": [
    {
      "id": "q1",
      "category": "Technical",
      "question": "...",
      "difficulty": "Medium",
      "whatInterviewerLooksFor": "...",
      "idealAnswerFramework": "STAR / Concept explanation...",
      "keyTerms": ["term1", "term2"]
    }
  ]
}`,

  EVALUATE_INTERVIEW_ANSWER: (question, answer, role) => `
Question: "${question}"
Candidate Answer: "${answer}"
Target Role: "${role}"

Evaluate the candidate's answer constructively. Give honest scoring and actionable feedback in JSON:
{
  "score": 8, // out of 10
  "rating": "Strong / Good / Needs Improvement",
  "strengths": ["Clear communication", "Mentioned measurable outcome"],
  "improvements": ["Could structure using STAR method more tightly", "Mention error handling"],
  "suggestedRevision": "An upgraded version of their answer keeping their genuine facts...",
  "keyMissedPoints": ["Key point 1", "Key point 2"]
}`
};

module.exports = { PROMPTS };
