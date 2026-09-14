import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const PricingPage = () => {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 font-display">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Everything you need to build, optimize, and tailor your resumes to land your dream role.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
        {/* Free Tier */}
        <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-subtle flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Starter Free</h3>
            <p className="text-sm text-slate-500">Perfect for students and first-time resume builders.</p>
            <div className="text-3xl font-extrabold text-slate-900">$0 <span className="text-sm font-normal text-slate-500">/ forever</span></div>

            <ul className="space-y-3 text-sm text-slate-600 pt-4 border-t border-slate-100">
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-600" /> Up to 3 Resumes</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-600" /> All 6 ATS-Friendly Templates</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-600" /> Basic ATS Scoring</li>
              <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-emerald-600" /> Unlimited PDF & Print Exports</li>
            </ul>
          </div>

          <Link to="/register">
            <Button variant="outline" size="lg" className="w-full">
              Get Started Free
            </Button>
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="p-8 bg-gradient-to-br from-brand-50/50 via-white to-indigo-50/50 rounded-3xl border-2 border-brand-500 shadow-xl flex flex-col justify-between space-y-6 relative">
          <div className="absolute -top-3.5 right-6 px-3 py-1 bg-brand-600 text-white font-bold text-xs rounded-full shadow-sm">
            Most Popular
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" />
              <h3 className="text-xl font-bold text-slate-900">AI Career Pro</h3>
            </div>
            <p className="text-sm text-slate-500">For active job seekers who want maximum interview conversion.</p>
            <div className="text-3xl font-extrabold text-slate-900">$12 <span className="text-sm font-normal text-slate-500">/ month</span></div>

            <ul className="space-y-3 text-sm text-slate-700 pt-4 border-t border-slate-200">
              <li className="flex items-center gap-2.5 font-medium"><Check className="w-4 h-4 text-emerald-600" /> Unlimited Resumes & Versions</li>
              <li className="flex items-center gap-2.5 font-medium"><Check className="w-4 h-4 text-emerald-600" /> Unlimited AI Bullet Rewrites & Metrics</li>
              <li className="flex items-center gap-2.5 font-medium"><Check className="w-4 h-4 text-emerald-600" /> 1-Click Job Tailoring & Skill Extraction</li>
              <li className="flex items-center gap-2.5 font-medium"><Check className="w-4 h-4 text-emerald-600" /> AI Cover Letter Generator</li>
              <li className="flex items-center gap-2.5 font-medium"><Check className="w-4 h-4 text-emerald-600" /> AI Mock Interview Preparation</li>
              <li className="flex items-center gap-2.5 font-medium"><Check className="w-4 h-4 text-emerald-600" /> Kanban Job Application Tracker</li>
            </ul>
          </div>

          <Link to="/register">
            <Button variant="ai" size="lg" icon={Sparkles} className="w-full">
              Upgrade to Pro (Demo Included)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
