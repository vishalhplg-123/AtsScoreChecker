import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  FileText,
  CheckCircle2,
  Download,
  Users,
  Star,
  Layers,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Award,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('modern');

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glow background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-400/20 via-indigo-500/20 to-cyan-400/20 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold shadow-xs animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Next-Gen AI Resume & ATS Career Suite</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.15]">
            Build an AI-powered resume that <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-cyan-500">gets noticed</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Create, optimize and tailor your resume with AI — engineered specifically for top recruiters and Applicant Tracking Systems (ATS).
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
                Create Resume Free
              </Button>
            </Link>
            <Link to="/app/ai-wizard" className="w-full sm:w-auto">
              <Button variant="ai" size="lg" icon={Sparkles} className="w-full sm:w-auto">
                Try AI Resume Builder
              </Button>
            </Link>
          </div>

          {/* Social Proof Mini */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% ATS-Friendly Templates
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-brand-600" /> Instant Metric Enhancer
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-600" /> No Fake Experience Ever
            </span>
          </div>
        </div>

        {/* Interactive Mockup Preview */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="p-3 sm:p-5 rounded-3xl bg-slate-900/5 ring-1 ring-slate-900/10 shadow-2xl backdrop-blur-xl">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-premium">
              {/* Fake Browser Toolbar */}
              <div className="bg-slate-100/90 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                </div>
                <div className="text-xs font-mono bg-white px-4 py-1 rounded-lg text-slate-600 border border-slate-200 shadow-xs flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                  resumeai.app/editor/senior-fullstack-resume
                </div>
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  ATS Score: 94%
                </div>
              </div>

              {/* Mock Editor Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 bg-slate-50/50">
                {/* Editor Left Column */}
                <div className="md:col-span-6 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live AI Assistant</span>
                    <span className="text-[10px] bg-brand-100 text-brand-800 font-bold px-2 py-0.5 rounded-full">Google XYZ Formula</span>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 shadow-xs">
                    <div className="text-xs text-slate-400 font-medium">Original Bullet:</div>
                    <div className="text-xs text-slate-600 line-through">
                      "Worked on backend APIs and helped make website faster."
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-brand-50 to-indigo-50/50 rounded-xl border border-brand-200 space-y-2 shadow-sm relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-600" /> AI Optimized Bullet
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded">
                        +38% ATS Match
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-800 leading-relaxed">
                      "Architected high-throughput RESTful APIs with Node.js and MongoDB, reducing p99 latency by 42% for over 120,000 monthly active users."
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to="/register" className="flex-1">
                      <Button variant="ai" size="sm" className="w-full">
                        Try with Your Resume
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Preview Right Column */}
                <div className="md:col-span-6 p-6 bg-white flex flex-col justify-center">
                  <div className="border border-slate-200 rounded-xl p-5 shadow-xs font-sans text-xs space-y-3">
                    <div className="border-b pb-2 flex justify-between items-start">
                      <div>
                        <div className="font-extrabold text-sm text-slate-900">Vishal Kumar</div>
                        <div className="text-[11px] font-semibold text-brand-600">Senior MERN Stack Engineer</div>
                      </div>
                      <div className="text-right text-[10px] text-slate-500">
                        Bengaluru, India • vishal@example.com
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Core Impact</div>
                      <div className="text-[11px] text-slate-700 leading-relaxed">
                        • Scaled multi-tenant SaaS application to 120k+ MAU with 99.98% uptime.
                      </div>
                      <div className="text-[11px] text-slate-700 leading-relaxed">
                        • Engineered real-time WebSocket state sync, reducing latency by 42%.
                      </div>
                    </div>
                    <div className="pt-1 flex flex-wrap gap-1">
                      {['React.js', 'Node.js', 'MongoDB', 'Docker', 'AWS'].map((s) => (
                        <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded text-[9.5px] font-semibold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-2">Everything You Need</h2>
          <h3 className="text-3xl font-extrabold text-slate-900 font-display">
            Designed for human recruiters and robotic ATS scanners
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-subtle hover:shadow-premium transition-all">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">AI-Powered Bullet Optimizer</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Transform passive job descriptions into metric-driven achievements using Google's XYZ formula. Add placeholders for authentic metrics.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-subtle hover:shadow-premium transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Automated ATS Score Checker</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Get an instant 0-100 ATS score with deep category breakdowns: keyword density, formatting, experience relevance, and missing skills.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-slate-200/80 shadow-subtle hover:shadow-premium transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Job Tailoring Engine</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Paste any job description and let ResumeAI identify matched vs missing skills, suggesting authentic enhancements to land the interview.
            </p>
          </div>
        </div>
      </section>

      {/* 3. AUDIENCE TARGETING */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="brand" size="lg" className="bg-brand-900/60 text-brand-300 border-brand-700">
            For All Career Stages
          </Badge>
          <h3 className="text-3xl sm:text-4xl font-extrabold font-display">
            Built for students, freshers, developers, professionals and career changers.
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Whether you are crafting your first resume or optimizing an executive portfolio, ResumeAI gives you the tools and confidence to stand out.
          </p>
          <div className="pt-4">
            <Link to="/register">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Start Building Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-12 rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-600 to-cyan-600 text-white shadow-2xl relative overflow-hidden space-y-6">
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display mb-3">
              Ready to build a resume that gets noticed?
            </h3>
            <p className="text-white/90 text-sm sm:text-base max-w-xl mx-auto mb-6">
              Join thousands of job seekers landing interviews at Google, Amazon, Microsoft, and top startups.
            </p>
            <Link to="/register">
              <Button variant="secondary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg">
                Create Free Resume in 2 Minutes
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
