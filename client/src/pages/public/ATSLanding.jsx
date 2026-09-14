import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export const ATSLanding = () => {
  const [sampleText, setSampleText] = useState(
    `Vishal Kumar\nSenior MERN Stack Engineer\nvishal@example.com | +91 98765 43210 | Bengaluru, India\n\nPROFESSIONAL SUMMARY\nInnovative Full Stack Developer with 4+ years of hands-on experience building scalable web applications with React, Node.js, Express, MongoDB, and AWS.\n\nEXPERIENCE\nSenior Developer - CloudScale Technologies (2022 - Present)\n• Architected and deployed multi-tenant SaaS application serving 120,000+ MAU with 99.98% uptime.\n• Optimized MongoDB indexing and API queries, reducing p99 response times by 42%.\n• Integrated Docker containers and automated CI/CD pipelines.\n\nEDUCATION\nB.Tech in Computer Science - National Institute of Technology (2016 - 2020)\n\nSKILLS\nReact.js, Node.js, Express.js, MongoDB, JavaScript, TypeScript, Docker, AWS, Git`
  );
  const [jobDescription, setJobDescription] = useState('We are looking for a Senior React and Node.js Developer with experience in MongoDB, Docker, REST APIs, and AWS microservices.');
  const [score, setScore] = useState(92);
  const [analyzed, setAnalyzed] = useState(false);

  const handleTest = () => {
    setAnalyzed(true);
    setScore(94);
  };

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
          <ShieldCheck className="w-4 h-4" />
          <span>Instant ATS Score Checker</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 font-display">
          Check If Your Resume Passes The ATS Test
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Over 75% of resumes are discarded by Applicant Tracking Systems before a human recruiter ever sees them. Test yours below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Sample Resume Text
              </label>
              <textarea
                rows={8}
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Target Job Description
              </label>
              <textarea
                rows={4}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <Button variant="primary" size="lg" icon={Sparkles} onClick={handleTest} className="w-full">
              Run Free ATS Audit
            </Button>
          </Card>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="p-6 space-y-6 bg-gradient-to-br from-emerald-50/50 via-white to-brand-50/50 border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Calculated ATS Score
                </span>
                <div className="text-5xl font-black text-slate-900 font-display mt-1">
                  {score}<span className="text-lg font-normal text-slate-400">/100</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                High Compatibility
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b">
                <span>Keyword Match (React, Node, MongoDB, AWS)</span>
                <span className="font-bold text-emerald-600">96%</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Action Verbs & XYZ Quantified Metrics</span>
                <span className="font-bold text-emerald-600">90%</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Contact Details & Section Hierarchy</span>
                <span className="font-bold text-emerald-600">98%</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">Want to optimize your full resume?</div>
              <p className="text-xs text-slate-500">
                Sign in to customize 6 exportable templates, auto-fix missing keywords, and generate matching cover letters.
              </p>
              <Link to="/register" className="block pt-1">
                <Button variant="ai" size="sm" icon={ArrowRight} className="w-full">
                  Create Full Resume Free
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
