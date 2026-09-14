import React from 'react';
import { Link } from 'react-router-dom';
import {
  BrainCircuit,
  ShieldCheck,
  Target,
  FileCheck,
  KanbanSquare,
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle,
  FileText,
  Mail,
  Compass,
} from 'lucide-react';
import { Button } from '../../components/common/Button';

export const FeaturesPage = () => {
  const features = [
    {
      icon: BrainCircuit,
      title: 'AI Resume Assistant',
      description: 'Instant bullet rewrites using Google’s XYZ framework, tone adjustments, metric suggestions, and role-tailored summaries.',
      color: 'text-brand-600 bg-brand-50',
    },
    {
      icon: ShieldCheck,
      title: 'Applicant Tracking System (ATS) Checker',
      description: 'Comprehensive 0-100 ATS scoring engine analyzing keyword density, structural readability, contact verification, and quantifiable achievements.',
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      icon: Target,
      title: '1-Click Job Tailoring',
      description: 'Compare your resume directly against any job description to extract matched keywords, missing requirements, and tailored bullet suggestions.',
      color: 'text-cyan-600 bg-cyan-50',
    },
    {
      icon: Mail,
      title: 'AI Cover Letter Generator',
      description: 'Generate customized, compelling cover letters matching your resume and company tone in seconds. Download as formatted PDF.',
      color: 'text-violet-600 bg-violet-50',
    },
    {
      icon: KanbanSquare,
      title: 'Kanban Job Application Tracker',
      description: 'Organize your entire job search pipeline from Wishlist to Applied, Screening, Interview, and Offer with interactive drag-and-drop.',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      icon: FileText,
      title: '6 ATS-Optimized A4 Templates',
      description: 'Pixel-perfect, print-friendly templates designed for recruiter readability and vector PDF export with selectable text.',
      color: 'text-rose-600 bg-rose-50',
    },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 font-display">
          Full-Stack Career Acceleration Platform
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Explore the comprehensive toolkit engineered to streamline your job search and help you land top-tier interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-8 bg-white rounded-3xl border border-slate-200 shadow-subtle hover:shadow-premium transition-all space-y-4"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${feat.color}`}>
              <feat.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{feat.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{feat.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <Link to="/register">
          <Button variant="primary" size="lg" icon={ArrowRight}>
            Get Started Free
          </Button>
        </Link>
      </div>
    </div>
  );
};
