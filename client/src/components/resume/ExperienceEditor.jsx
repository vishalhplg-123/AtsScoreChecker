import React, { useState } from 'react';
import { Plus, Trash2, GripVertical, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../common/Button';
import { AIButton } from '../ai/AIButton';
import { AIModal } from '../ai/AIModal';

export const ExperienceEditor = () => {
  const { resume, setResume } = useResume();
  const experienceList = resume.experience || [];
  const [activeAI, setActiveAI] = useState(null); // { expIdx, bulletIdx, text }

  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: ['Led development of core features, achieving [X%] improvement in system performance.'],
    };
    setResume((prev) => ({
      ...prev,
      experience: [newExp, ...(prev.experience || [])],
    }));
  };

  const updateExpField = (idx, field, value) => {
    setResume((prev) => {
      const list = [...(prev.experience || [])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, experience: list };
    });
  };

  const removeExperience = (idx) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== idx),
    }));
  };

  const addBullet = (expIdx) => {
    setResume((prev) => {
      const list = [...prev.experience];
      list[expIdx].bullets = [...(list[expIdx].bullets || []), ''];
      return { ...prev, experience: list };
    });
  };

  const updateBullet = (expIdx, bulletIdx, val) => {
    setResume((prev) => {
      const list = [...prev.experience];
      list[expIdx].bullets[bulletIdx] = val;
      return { ...prev, experience: list };
    });
  };

  const removeBullet = (expIdx, bulletIdx) => {
    setResume((prev) => {
      const list = [...prev.experience];
      list[expIdx].bullets = list[expIdx].bullets.filter((_, i) => i !== bulletIdx);
      return { ...prev, experience: list };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Highlight your career progression and quantifiable achievements using action verbs.
        </p>
        <Button variant="secondary" size="sm" icon={Plus} onClick={addExperience}>
          Add Experience
        </Button>
      </div>

      {experienceList.map((exp, expIdx) => (
        <div
          key={exp.id || expIdx}
          className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-4 relative group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Position #{expIdx + 1}
            </span>
            <button
              type="button"
              onClick={() => removeExperience(expIdx)}
              className="text-slate-400 hover:text-rose-600 transition-colors p-1"
              title="Delete Position"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Company *</label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => updateExpField(expIdx, 'company', e.target.value)}
                placeholder="e.g. Google, Stripe"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Job Title *</label>
              <input
                type="text"
                value={exp.position || ''}
                onChange={(e) => updateExpField(expIdx, 'position', e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={exp.location || ''}
                onChange={(e) => updateExpField(expIdx, 'location', e.target.value)}
                placeholder="e.g. Bengaluru, India or Remote"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate || ''}
                  onChange={(e) => updateExpField(expIdx, 'startDate', e.target.value)}
                  placeholder="e.g. 2022-01"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">End Date</label>
                <input
                  type="text"
                  disabled={exp.current}
                  value={exp.current ? 'Present' : exp.endDate || ''}
                  onChange={(e) => updateExpField(expIdx, 'endDate', e.target.value)}
                  placeholder="e.g. 2024-03"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white disabled:bg-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`current-${expIdx}`}
              checked={exp.current || false}
              onChange={(e) => updateExpField(expIdx, 'current', e.target.checked)}
              className="rounded text-brand-600 focus:ring-brand-500"
            />
            <label htmlFor={`current-${expIdx}`} className="text-xs text-slate-700 font-medium">
              I currently work here
            </label>
          </div>

          {/* Bullet Points */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">
                Key Accomplishments & Bullet Points
              </label>
              <button
                type="button"
                onClick={() => addBullet(expIdx)}
                className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Bullet
              </button>
            </div>

            {exp.bullets?.map((bullet, bulletIdx) => (
              <div key={bulletIdx} className="flex items-start gap-2">
                <textarea
                  rows={2}
                  value={bullet}
                  onChange={(e) => updateBullet(expIdx, bulletIdx, e.target.value)}
                  placeholder="e.g. Engineered distributed cache in Redis, reducing p99 latency by 35% across 1M+ requests."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:ring-1 focus:ring-brand-500"
                />

                <div className="flex flex-col gap-1">
                  <AIButton
                    compact
                    label="Rewrite"
                    onClick={() =>
                      setActiveAI({
                        expIdx,
                        bulletIdx,
                        text: bullet,
                      })
                    }
                  />
                  {exp.bullets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBullet(expIdx, bulletIdx)}
                      className="text-slate-400 hover:text-rose-500 p-1 self-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {experienceList.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-2xl">
          <p className="text-sm text-slate-500 mb-3">No work experience added yet.</p>
          <Button variant="primary" size="sm" icon={Plus} onClick={addExperience}>
            Add First Job
          </Button>
        </div>
      )}

      {/* In-line AI Assistant Modal */}
      {activeAI && (
        <AIModal
          isOpen={!!activeAI}
          onClose={() => setActiveAI(null)}
          type="bullet"
          initialText={activeAI.text}
          targetRole={experienceList[activeAI.expIdx]?.position || 'Software Engineer'}
          onApply={(text) => {
            updateBullet(activeAI.expIdx, activeAI.bulletIdx, text);
            setActiveAI(null);
          }}
        />
      )}
    </div>
  );
};
