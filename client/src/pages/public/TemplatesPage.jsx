import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const TemplatesPage = () => {
  const templates = [
    {
      id: 'classic',
      name: 'Classic ATS',
      badge: 'Maximum Compatibility',
      bestFor: 'Entry Level, Corporate, Traditional Industries',
      desc: 'Single column, clean serif typography, optimal whitespace, and highest ATS parseability score.',
    },
    {
      id: 'modern',
      name: 'Modern',
      badge: 'Most Popular',
      bestFor: 'Tech, Startups, Product Management, Design',
      desc: 'Balanced two-column layout with left sidebar for skills, contact, and education.',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      badge: 'Clean Aesthetic',
      bestFor: 'Consulting, Finance, Software Engineering',
      desc: 'Ultra-clean sans-serif design, subtle dividers, and high information density.',
    },
    {
      id: 'developer',
      name: 'Developer',
      badge: 'Tech Specialist',
      bestFor: 'Software Engineers, DevOps, Full-Stack Developers',
      desc: 'Tailored for tech roles: monospace accents, GitHub link badges, tech tags per project.',
    },
    {
      id: 'professional',
      name: 'Professional',
      badge: 'Corporate Polish',
      bestFor: 'Mid-Senior Managers, Directors, Consultants',
      desc: 'Executive navy header accents, refined dividers, and strong organizational balance.',
    },
    {
      id: 'executive',
      name: 'Executive',
      badge: 'Leadership Focus',
      bestFor: 'VPs, C-Suite, Principal Architects',
      desc: 'Centered luxury layout, leadership achievements banner, and prominent career metrics.',
    },
  ];

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 font-display">
          Recruiter-Approved Resume Templates
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Every template is crafted to pass ATS filters effortlessly while looking visually stunning to human hiring managers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-subtle hover:shadow-premium transition-all overflow-hidden flex flex-col justify-between p-6 space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                  {tpl.badge}
                </span>
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> ATS Score: 98%
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">{tpl.name}</h3>
              <p className="text-xs font-semibold text-slate-500">Best for: {tpl.bestFor}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{tpl.desc}</p>
            </div>

            <Link to={`/app/builder?template=${tpl.id}`}>
              <Button variant="outline" size="sm" className="w-full">
                Use This Template
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
