const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- Starting ResumeAI Backend Automated Test Suite ---');
  let token = '';

  try {
    // 1. Health check
    console.log('[Test 1] Health Check...');
    const healthRes = await fetch(`${BASE_URL}/health`);
    const health = await healthRes.json();
    console.log('✓ Health status:', health.status);

    // 2. Auth Login
    console.log('[Test 2] Auth Login (Demo User)...');
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'vishal@example.com',
        password: 'password123',
      }),
    });
    const loginData = await loginRes.json();
    token = loginData.token;
    console.log('✓ Logged in as:', loginData.user.name);

    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // 3. Get Current User
    console.log('[Test 3] Get /auth/me...');
    const meRes = await fetch(`${BASE_URL}/auth/me`, { headers: authHeaders });
    const meData = await meRes.json();
    console.log('✓ Verified user profile:', meData.user.headline);

    // 4. Get Resumes
    console.log('[Test 4] Get /resumes...');
    const resumesRes = await fetch(`${BASE_URL}/resumes`, { headers: authHeaders });
    const resumesData = await resumesRes.json();
    console.log(`✓ Fetched ${resumesData.count} resumes. First: "${resumesData.data[0]?.title}"`);
    const testResume = resumesData.data[0];

    // 5. AI Improve Bullet
    console.log('[Test 5] AI Improve Bullet...');
    const bulletRes = await fetch(`${BASE_URL}/ai/improve-bullet`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        bullet: 'Worked on database queries and improved speed.',
        action: 'make_achievement_focused',
        role: 'Senior Full Stack Developer',
      }),
    });
    const bulletData = await bulletRes.json();
    console.log('✓ AI Improved Bullet:', bulletData.data.improved);

    // 6. AI Summary Generation
    console.log('[Test 6] AI Generate Summary...');
    const summaryRes = await fetch(`${BASE_URL}/ai/generate-summary`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        role: 'Senior MERN Developer',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
      }),
    });
    const summaryData = await summaryRes.json();
    console.log('✓ AI Summary (Standard):', summaryData.data.summaries.standard.slice(0, 80) + '...');

    // 7. ATS Scoring Analysis
    console.log('[Test 7] AI ATS Analysis...');
    const atsRes = await fetch(`${BASE_URL}/ai/analyze-resume`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        resumeData: testResume,
        jobDescription: 'Seeking Senior Full Stack Developer proficient in React, Node.js, MongoDB, Docker, and Microservices.',
      }),
    });
    const atsData = await atsRes.json();
    console.log(`✓ ATS Overall Score: ${atsData.data.overallScore}/100 (Keywords Match: ${atsData.data.scores.keywordMatch}%)`);

    // 8. Job Tailoring
    console.log('[Test 8] AI Job Tailor...');
    const tailorRes = await fetch(`${BASE_URL}/ai/tailor-resume`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        resumeData: testResume,
        jobDescription: 'Seeking React Developer with TypeScript, Docker, and AWS experience.',
      }),
    });
    const tailorData = await tailorRes.json();
    console.log(`✓ Tailor Match Score: ${tailorData.data.matchScore}%`);
    console.log('✓ Matched keywords:', tailorData.data.matchedKeywords);

    // 9. Cover Letter Generation
    console.log('[Test 9] AI Generate Cover Letter...');
    const coverRes = await fetch(`${BASE_URL}/ai/generate-cover-letter`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        resumeData: testResume,
        company: 'Stripe',
        jobTitle: 'Senior Full Stack Engineer',
        tone: 'confident',
      }),
    });
    const coverData = await coverRes.json();
    console.log('✓ Cover Letter Subject:', coverData.data.subjectLine);

    // 10. Interview Prep & Answer Evaluation
    console.log('[Test 10] AI Interview Prep...');
    const prepRes = await fetch(`${BASE_URL}/ai/interview-prep`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        role: 'Senior Full Stack Developer',
        company: 'Google',
      }),
    });
    const prepData = await prepRes.json();
    console.log(`✓ Generated ${prepData.data.questions?.length} interview questions.`);

    console.log('[Test 10b] AI Evaluate Answer...');
    const evalRes = await fetch(`${BASE_URL}/ai/evaluate-answer`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({
        question: prepData.data.questions[0].question,
        answer: 'I diagnosed the issue using React DevTools profiler and memoized expensive computations with useMemo, reducing re-renders by 40%.',
        role: 'Senior Full Stack Developer',
      }),
    });
    const evalData = await evalRes.json();
    console.log(`✓ Answer evaluation score: ${evalData.data.score}/10 (${evalData.data.rating})`);

    // 11. Jobs Kanban
    console.log('[Test 11] Get /jobs Kanban...');
    const jobsRes = await fetch(`${BASE_URL}/jobs`, { headers: authHeaders });
    const jobsData = await jobsRes.json();
    console.log(`✓ Fetched ${jobsData.data?.length} job applications. Total stats:`, jobsData.stats);

    // 12. Cover Letters
    console.log('[Test 12] Get /cover-letters...');
    const lettersRes = await fetch(`${BASE_URL}/cover-letters`, { headers: authHeaders });
    const lettersData = await lettersRes.json();
    console.log(`✓ Fetched ${lettersData.count} cover letters.`);

    console.log('\n=========================================');
    console.log('🎉 ALL BACKEND INTEGRATION TESTS PASSED!');
    console.log('=========================================');
    process.exit(0);
  } catch (err) {
    console.error('❌ Test failed:', err.message);
    process.exit(1);
  }
}

// Execute test suite
runTests();
