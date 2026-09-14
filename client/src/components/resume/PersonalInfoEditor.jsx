import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { AIButton } from '../ai/AIButton';
import { AIModal } from '../ai/AIModal';

export const PersonalInfoEditor = () => {
  const { resume, updatePersonalInfo } = useResume();
  const info = resume.personalInfo || {};
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={info.fullName || ''}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            placeholder="e.g. Vishal Kumar"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-700">
              Professional Title / Role *
            </label>
            <AIButton
              label="Generate Title"
              compact
              onClick={() => setAiModalOpen(true)}
            />
          </div>
          <input
            type="text"
            value={info.jobTitle || ''}
            onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
            placeholder="e.g. Senior MERN Stack Developer"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={info.email || ''}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            placeholder="e.g. vishal@example.com"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number
          </label>
          <input
            type="text"
            value={info.phone || ''}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            placeholder="e.g. +91 98765 43210"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Location (City, Country)
          </label>
          <input
            type="text"
            value={info.location || ''}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            placeholder="e.g. Bengaluru, India"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            LinkedIn Profile
          </label>
          <input
            type="text"
            value={info.linkedin || ''}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            placeholder="e.g. linkedin.com/in/vishalkumar-dev"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            GitHub Profile
          </label>
          <input
            type="text"
            value={info.github || ''}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
            placeholder="e.g. github.com/vishal-kumar-dev"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Portfolio / Website
          </label>
          <input
            type="text"
            value={info.website || ''}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            placeholder="e.g. vishalkumar.dev"
            className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
          />
        </div>
      </div>

      <AIModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        type="bullet"
        initialText={info.jobTitle || 'Full Stack Developer'}
        targetRole={resume.targetRole || info.jobTitle || 'Full Stack Developer'}
        onApply={(text) => updatePersonalInfo('jobTitle', text)}
      />
    </div>
  );
};
