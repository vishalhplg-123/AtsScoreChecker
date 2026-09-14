# ResumeAI — Production-Ready AI-Powered Resume Builder & Career SaaS

> **Tagline:** Build a resume that gets noticed.  
> **Stack:** MERN (MongoDB, Express.js, React.js with Vite & Tailwind CSS, Node.js) + OpenAI API (with intelligent hybrid fallback engine).

ResumeAI is a production-grade career platform inspired by modern category leaders like Enhancv, featuring an original identity, comprehensive multi-section resume builder, 6 ATS-optimized A4 templates, AI bullet optimizer (using Google's XYZ formula), automated ATS scoring, 1-click job tailoring, AI cover letter generator, Kanban job tracker, resume PDF/DOCX parser, and AI mock interview prep.

---

## 🚀 Key Features

### 1. Multi-Section Live Resume Editor
- **Sections:** Personal Info, Professional Summary, Work Experience, Technical Skills, Projects & Portfolio, Education, Certifications, Achievements, Languages, and Custom Sections.
- **Section Controls:** Add, edit, delete, reorder, hide/show, and duplicate sections.
- **Real-Time Autosave:** Debounced autosaving with live status indicators.
- **Side-by-Side Live A4 Preview:** Realistic vector A4 canvas with Zoom controls (60%–130%), print styling, and 1-click selectable PDF download (`html2pdf.js`).
- **Responsive Mobile Layout:** Seamlessly switch between Editor, Design customizer, and Live Preview on mobile viewports.

### 2. 6 ATS-Optimized Production Templates
1. **Classic ATS:** Single-column, clean serif typography, optimal whitespace, maximum ATS parseability.
2. **Modern:** Two-column design with left sidebar for skills/contact/education and right column for experience.
3. **Minimal:** Ultra-clean sans-serif aesthetic with high information density.
4. **Developer:** Tailored for tech roles; monospace code accents, GitHub links, and categorized tech badges.
5. **Professional:** Corporate navy dividers and executive typography balance.
6. **Executive:** Centered luxury layout, leadership achievements banner, and prominent career metrics.
- **Live Customizer:** Custom color presets & hex color picker, font family switcher (Inter, Merriweather, JetBrains Mono), font size scaling (Small, Medium, Large), and section toggles.

### 3. In-Line AI Writing Assistant
- **Modes:** *Improve Quality*, *Add Metrics (XYZ Formula)*, *ATS Optimize*, *Make Concise*.
- **Interactive Review:** Live *Before vs. After* comparison with *Accept*, *Reject*, *Edit Manually*, and *Regenerate* controls.
- **Safety Guarantee:** AI never fabricates false companies, degrees, or unverifiable numbers; instead, it uses smart bracketed placeholders (e.g. `[improved by 35%]`).

### 4. Guided AI Resume Onboarding Wizard
- 6-step guided wizard: Target role → Experience level → Technical skills → Target job description → Choose template → AI generates full initial resume draft with interactive review.

### 5. Resume PDF & DOCX Parser
- Upload existing `.pdf` or `.docx` files (up to 5MB).
- Extracts contact details, summary, experience blocks, education, and skill tags into the Resume model.
- Preview extracted data before creating or overwriting resumes.

### 6. Automated ATS Score & Gap Checker
- Instant **0–100 ATS Score** calculation with weighted category breakdowns:
  - Keyword & Tech Match %
  - Experience & Action Verbs %
  - Skills Coverage %
  - Structure & Contact Formatting %
  - Professional Summary Quality %
- Extracts **Matched Keywords** vs. **Missing High-Value Terms** against any target job description.
- Actionable priority checklist (*High / Medium / Low*).

### 7. 1-Click Job Tailoring Assistant
- Side-by-side comparison between your resume and target job descriptions.
- Computes matching alignment % and suggests tailored bullet points and summary adjustments.
- 1-Click shortcut to generate matching cover letters.

### 8. AI Cover Letter Generator
- Select resume + Job Description + Company + Job Title + Tone (*Professional*, *Confident*, *Concise*, *Friendly*).
- Formats letter into clean paragraphs; allows in-place editing, clipboard copy, and formatted PDF download.

### 9. Kanban Job Application Tracker
- 6 pipeline stages: **Wishlist → Applied → Screening → Interview → Offer → Rejected**.
- Track company, position, salary range, job post URL, interview dates, notes, and linked resumes.
- Live pipeline statistics (Total Applications, Active Pipeline, Interviews, Offer Rate).

### 10. AI Mock Interview Preparation & Coach
- Generates realistic Technical, Behavioral (STAR method), Architecture, and HR questions tailored to your target role and company.
- Interactive practice: Type your response to receive instant 1-10 scoring, strengths, improvement tips, and a model upgraded answer.

---

## 📁 Project Architecture

```
d:/AtsScoreChecker/
├── client/                     # React 18 + Vite + Tailwind CSS Frontend
│   ├── public/                 # Static assets & icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── ai/             # AIButton, AIModal
│   │   │   ├── common/         # Button, Card, Badge, Modal, etc.
│   │   │   ├── layout/         # Navbar, Footer, Sidebar, DashboardHeader, Public/Dashboard Layouts
│   │   │   └── resume/         # Section Editors (Personal, Summary, Experience, Skills, Projects, etc.), Customizer, ExportToolbar
│   │   ├── context/            # AuthContext, ResumeContext, ToastContext
│   │   ├── pages/
│   │   │   ├── public/         # LandingPage, FeaturesPage, TemplatesPage, PricingPage, ExamplesPage, ATSLanding, LoginPage, RegisterPage
│   │   │   └── dashboard/      # DashboardHome, MyResumes, ResumeEditor, ATSChecker, JobTailor, CoverLetterGenerator, JobTracker, InterviewPrep, AIWizard, SettingsPage
│   │   ├── services/           # Axios API clients (authService, resumeService, aiService, jobService, coverLetterService, uploadService)
│   │   ├── templates/          # 6 Resume Templates: Classic, Modern, Minimal, Developer, Professional, Executive & TemplateRenderer
│   │   ├── App.jsx             # React Router routing hierarchy
│   │   ├── main.jsx            # React root mount
│   │   └── index.css           # Tailwind + A4 print stylesheets
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── server/                     # Node.js + Express.js Backend
│   ├── config/                 # db.js (MongoDB), openai.js, config.js
│   ├── controllers/            # authController, resumeController, aiController, jobController, coverLetterController, uploadController
│   ├── middleware/             # authMiddleware (JWT), errorMiddleware, uploadMiddleware (Multer), rateLimiter
│   ├── models/                 # User, Resume, JobApplication, CoverLetter, AIAnalysis
│   ├── routes/                 # authRoutes, resumeRoutes, aiRoutes, jobRoutes, coverLetterRoutes, uploadRoutes
│   ├── services/               # aiService (OpenAI + Intelligent Fallback), atsService, parserService (pdf-parse & mammoth)
│   ├── utils/                  # seedData.js, promptTemplates.js
│   ├── index.js                # Express app entrypoint
│   ├── package.json
│   └── .env.example
└── README.md                   # Full Documentation & Deployment Guide
```

---

## ⚙️ Environment Variables

### Server Configuration (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/resumeai
JWT_SECRET=super_secret_jwt_key_resumeai_production_grade_2026
JWT_EXPIRE=30d
OPENAI_API_KEY=your_openai_api_key_here
CLIENT_URL=http://localhost:5173
```
*(Note: If `OPENAI_API_KEY` is not provided, ResumeAI automatically operates in Intelligent Hybrid Fallback Mode so all AI features remain 100% functional without errors.)*

---

## 🏃 Local Setup & Running Instructions

### 1. Install Dependencies
```bash
# In server directory:
cd server
npm install

# In client directory:
cd ../client
npm install
```

### 2. Seed Realistic Demo Data
Populates demo user **Vishal Kumar (MERN Developer)** with 3 ATS-optimized resumes, Kanban applications, and cover letters:
```bash
cd server
npm run seed
```
- **Demo Email:** `vishal@example.com`
- **Demo Password:** `password123`
*(Or simply click the **"1-Click Demo Login"** button on the Login page)*

### 3. Run Backend & Frontend

**Terminal 1 (Backend):**
```bash
cd server
npm start
# Server starts on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
# Vite starts on http://localhost:5173
```

---

## 🌐 Production Deployment Guide

### Deploying Backend to Render / Railway
1. Push your repository to GitHub.
2. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app).
3. Set Root Directory to `server`.
4. Set Build Command: `npm install`
5. Set Start Command: `node index.js`
6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection URI.
   - `JWT_SECRET`: A secure random secret string.
   - `OPENAI_API_KEY`: Your OpenAI API key (optional).
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your Vercel frontend URL.

### Deploying Frontend to Vercel
1. Create a new Project on [Vercel](https://vercel.com).
2. Select your repository and set Root Directory to `client`.
3. Set Framework Preset to `Vite`.
4. Add Environment Variable:
   - `VITE_API_URL`: `https://your-backend-render-url.onrender.com/api`
5. Click **Deploy**.

---

## 🛡️ Security & Quality Standards
- **Authentication:** Salted bcrypt hashing (10 rounds) with standard JWT authorization headers.
- **Security Middleware:** Helmet for security HTTP headers, CORS origin whitelisting, and Express rate limiting.
- **Upload Validation:** Strict MIME-type checking and 5MB size limits.
- **ATS Compatibility:** Vector A4 standard sizing, semantic HTML hierarchy, high contrast ratios, and printable CSS sheets.
