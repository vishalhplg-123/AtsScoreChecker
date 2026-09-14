import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { FeaturesPage } from './pages/public/FeaturesPage';
import { TemplatesPage } from './pages/public/TemplatesPage';
import { PricingPage } from './pages/public/PricingPage';
import { ExamplesPage } from './pages/public/ExamplesPage';
import { ATSLanding } from './pages/public/ATSLanding';
import { LoginPage } from './pages/public/LoginPage';
import { RegisterPage } from './pages/public/RegisterPage';

// Authenticated Dashboard Pages
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { MyResumes } from './pages/dashboard/MyResumes';
import { ResumeEditor } from './pages/dashboard/ResumeEditor';
import { ATSChecker } from './pages/dashboard/ATSChecker';
import { JobTailor } from './pages/dashboard/JobTailor';
import { CoverLetterGenerator } from './pages/dashboard/CoverLetterGenerator';
import { JobTracker } from './pages/dashboard/JobTracker';
import { InterviewPrep } from './pages/dashboard/InterviewPrep';
import { AIWizard } from './pages/dashboard/AIWizard';
import { SettingsPage } from './pages/dashboard/SettingsPage';

export function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            {/* Public Marketing Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/templates" element={<TemplatesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/examples" element={<ExamplesPage />} />
              <Route path="/ats-checker" element={<ATSLanding />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Authenticated Dashboard Routes */}
            <Route path="/app" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="resumes" element={<MyResumes />} />
              <Route path="builder" element={<ResumeEditor />} />
              <Route path="ai-wizard" element={<AIWizard />} />
              <Route path="ats-checker" element={<ATSChecker />} />
              <Route path="job-tailor" element={<JobTailor />} />
              <Route path="cover-letters" element={<CoverLetterGenerator />} />
              <Route path="job-tracker" element={<JobTracker />} />
              <Route path="interview-prep" element={<InterviewPrep />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
