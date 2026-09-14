import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-500 to-cyan-400 flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white font-display">
                Resume<span className="text-brand-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Build an AI-powered resume that gets noticed. Create, optimize, and tailor your resume for recruiters and modern ATS systems.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> 100% ATS Compatibility Guaranteed
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/features" className="hover:text-white transition-colors">AI Resume Builder</Link></li>
              <li><Link to="/templates" className="hover:text-white transition-colors">Resume Templates</Link></li>
              <li><Link to="/ats-checker" className="hover:text-white transition-colors">ATS Score Checker</Link></li>
              <li><Link to="/app/cover-letters" className="hover:text-white transition-colors">Cover Letter Generator</Link></li>
              <li><Link to="/app/job-tracker" className="hover:text-white transition-colors">Job Application Tracker</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/examples" className="hover:text-white transition-colors">Resume Examples</Link></li>
              <li><Link to="/features" className="hover:text-white transition-colors">Action Verbs Guide</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Demo Login</Link></li>
            </ul>
          </div>

          {/* Legal / Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ResumeAI Inc. All rights reserved. Designed for job seekers worldwide.</p>
          <div className="flex items-center gap-1">
            <span>Built with precision for developers & professionals</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
