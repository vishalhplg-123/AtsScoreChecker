import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { AIButton } from '../ai/AIButton';
import { AIModal } from '../ai/AIModal';

export const SummaryEditor = () => {
  const { resume, updateSummary } = useResume();
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          Professional Summary / Objective
        </label>
        <AIButton
          label="Improve with AI"
          onClick={() => setAiModalOpen(true)}
        />
      </div>

      <textarea
        rows={4}
        value={resume.summary || ''}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Brief summary of your professional background, top achievements, and core domain expertise..."
        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white leading-relaxed"
      />

      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Recommended length: 2 - 4 impactful sentences</span>
        <span>{(resume.summary || '').length} characters</span>
      </div>

      <AIModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        type="summary"
        initialText={resume.summary || ''}
        targetRole={resume.targetRole || resume.personalInfo?.jobTitle || 'Software Engineer'}
        onApply={(text) => updateSummary(text)}
      />
    </div>
  );
};
