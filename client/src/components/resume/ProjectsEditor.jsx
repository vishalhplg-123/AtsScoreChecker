import React, { useState } from 'react';
import { Plus, Trash2, Github, ExternalLink } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../common/Button';
import { AIButton } from '../ai/AIButton';
import { AIModal } from '../ai/AIModal';

export const ProjectsEditor = () => {
  const { resume, setResume } = useResume();
  const projectsList = resume.projects || [];
  const [activeAI, setActiveAI] = useState(null); // { projIdx, bulletIdx, text }

  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: '',
      subtitle: '',
      link: '',
      github: '',
      startDate: '2023',
      endDate: '2024',
      technologies: ['React', 'Node.js', 'MongoDB'],
      bullets: ['Engineered full-stack responsive web application with JWT authentication.'],
    };
    setResume((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProj],
    }));
  };

  const updateProjField = (idx, field, value) => {
    setResume((prev) => {
      const list = [...(prev.projects || [])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, projects: list };
    });
  };

  const removeProject = (idx) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== idx),
    }));
  };

  const addBullet = (projIdx) => {
    setResume((prev) => {
      const list = [...prev.projects];
      list[projIdx].bullets = [...(list[projIdx].bullets || []), ''];
      return { ...prev, projects: list };
    });
  };

  const updateBullet = (projIdx, bulletIdx, val) => {
    setResume((prev) => {
      const list = [...prev.projects];
      list[projIdx].bullets[bulletIdx] = val;
      return { ...prev, projects: list };
    });
  };

  const removeBullet = (projIdx, bulletIdx) => {
    setResume((prev) => {
      const list = [...prev.projects];
      list[projIdx].bullets = list[projIdx].bullets.filter((_, i) => i !== bulletIdx);
      return { ...prev, projects: list };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Showcase notable projects, open source contributions, and real-world apps.
        </p>
        <Button variant="secondary" size="sm" icon={Plus} onClick={addProject}>
          Add Project
        </Button>
      </div>

      {projectsList.map((proj, projIdx) => (
        <div
          key={proj.id || projIdx}
          className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-4 relative group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Project #{projIdx + 1}
            </span>
            <button
              type="button"
              onClick={() => removeProject(projIdx)}
              className="text-slate-400 hover:text-rose-600 transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Project Name *</label>
              <input
                type="text"
                value={proj.title || ''}
                onChange={(e) => updateProjField(projIdx, 'title', e.target.value)}
                placeholder="e.g. ResumeAI SaaS, Uber Clone"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Subtitle / Category</label>
              <input
                type="text"
                value={proj.subtitle || ''}
                onChange={(e) => updateProjField(projIdx, 'subtitle', e.target.value)}
                placeholder="e.g. AI Career & Resume Platform"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Live URL (Optional)</label>
              <input
                type="text"
                value={proj.link || ''}
                onChange={(e) => updateProjField(projIdx, 'link', e.target.value)}
                placeholder="e.g. https://myproject.com"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">GitHub Repo (Optional)</label>
              <input
                type="text"
                value={proj.github || ''}
                onChange={(e) => updateProjField(projIdx, 'github', e.target.value)}
                placeholder="e.g. https://github.com/user/project"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">Technologies Used</label>
              <input
                type="text"
                value={proj.technologies?.join(', ') || ''}
                onChange={(e) =>
                  updateProjField(
                    projIdx,
                    'technologies',
                    e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                  )
                }
                placeholder="Comma-separated: React, Node.js, Express, MongoDB, Tailwind"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>
          </div>

          {/* Project Bullets */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">
                Key Features & Impact
              </label>
              <button
                type="button"
                onClick={() => addBullet(projIdx)}
                className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Bullet
              </button>
            </div>

            {proj.bullets?.map((bullet, bulletIdx) => (
              <div key={bulletIdx} className="flex items-start gap-2">
                <textarea
                  rows={2}
                  value={bullet}
                  onChange={(e) => updateBullet(projIdx, bulletIdx, e.target.value)}
                  placeholder="Describe your technical implementation and measurable results..."
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
                />
                <AIButton
                  compact
                  label="Rewrite"
                  onClick={() =>
                    setActiveAI({
                      projIdx,
                      bulletIdx,
                      text: bullet,
                    })
                  }
                />
                {proj.bullets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBullet(projIdx, bulletIdx)}
                    className="text-slate-400 hover:text-rose-500 p-1 self-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {activeAI && (
        <AIModal
          isOpen={!!activeAI}
          onClose={() => setActiveAI(null)}
          type="bullet"
          initialText={activeAI.text}
          targetRole="Full Stack Project"
          onApply={(text) => {
            updateBullet(activeAI.projIdx, activeAI.bulletIdx, text);
            setActiveAI(null);
          }}
        />
      )}
    </div>
  );
};
