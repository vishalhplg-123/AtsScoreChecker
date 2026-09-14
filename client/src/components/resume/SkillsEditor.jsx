import React, { useState } from 'react';
import { Plus, Trash2, X, Sparkles } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../common/Button';
import { AIButton } from '../ai/AIButton';
import { aiService } from '../../services/aiService';
import { useToast } from '../../context/ToastContext';

export const SkillsEditor = () => {
  const { resume, setResume } = useResume();
  const skillsCategories = resume.skills || [];
  const [newSkillInput, setNewSkillInput] = useState({});
  const [aiLoading, setAiLoading] = useState(false);
  const { showSuccess, showError } = useToast();

  const addCategory = () => {
    setResume((prev) => ({
      ...prev,
      skills: [...(prev.skills || []), { category: 'New Category', items: [] }],
    }));
  };

  const updateCategoryName = (idx, name) => {
    setResume((prev) => {
      const list = [...prev.skills];
      list[idx].category = name;
      return { ...prev, skills: list };
    });
  };

  const removeCategory = (idx) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== idx),
    }));
  };

  const addSkillItem = (catIdx) => {
    const val = (newSkillInput[catIdx] || '').trim();
    if (!val) return;

    setResume((prev) => {
      const list = [...prev.skills];
      const items = list[catIdx].items || [];
      if (!items.includes(val)) {
        list[catIdx].items = [...items, val];
      }
      return { ...prev, skills: list };
    });

    setNewSkillInput((prev) => ({ ...prev, [catIdx]: '' }));
  };

  const removeSkillItem = (catIdx, itemIdx) => {
    setResume((prev) => {
      const list = [...prev.skills];
      list[catIdx].items = list[catIdx].items.filter((_, i) => i !== itemIdx);
      return { ...prev, skills: list };
    });
  };

  const handleSuggestSkills = async () => {
    setAiLoading(true);
    try {
      const res = await aiService.suggestSkills({
        role: resume.targetRole || resume.personalInfo?.jobTitle || 'Software Engineer',
      });
      if (res.data) {
        // Auto add categories if empty, or append to categories
        const suggestions = res.data;
        const newCats = [
          { category: 'Technical Skills', items: suggestions.technicalSkills || [] },
          { category: 'Frameworks & Tools', items: suggestions.frameworksAndLibraries || [] },
          { category: 'Platforms & Cloud', items: suggestions.toolsAndPlatforms || [] },
        ].filter((c) => c.items.length > 0);

        setResume((prev) => ({
          ...prev,
          skills: newCats,
        }));
        showSuccess('Added AI recommended skills for your role!');
      }
    } catch (err) {
      showError('Failed to generate skill suggestions.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Group technical and soft skills to pass ATS keyword match algorithms.
        </p>
        <div className="flex gap-2">
          <AIButton
            label={aiLoading ? 'Suggesting...' : 'Suggest Skills'}
            loading={aiLoading}
            onClick={handleSuggestSkills}
          />
          <Button variant="secondary" size="sm" icon={Plus} onClick={addCategory}>
            Add Group
          </Button>
        </div>
      </div>

      {skillsCategories.map((cat, catIdx) => (
        <div
          key={catIdx}
          className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3"
        >
          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              value={cat.category}
              onChange={(e) => updateCategoryName(catIdx, e.target.value)}
              className="font-bold text-xs uppercase tracking-wider text-slate-800 bg-transparent border-b border-dashed border-slate-300 focus:border-brand-500 focus:outline-none px-1 py-0.5"
            />
            {skillsCategories.length > 1 && (
              <button
                type="button"
                onClick={() => removeCategory(catIdx)}
                className="text-slate-400 hover:text-rose-500 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Skill Badges */}
          <div className="flex flex-wrap gap-1.5 min-h-[32px]">
            {cat.items?.map((item, itemIdx) => (
              <span
                key={itemIdx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-slate-800 rounded-lg text-xs font-medium shadow-xs"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeSkillItem(catIdx, itemIdx)}
                  className="text-slate-400 hover:text-rose-500 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {/* Add skill input */}
          <div className="flex gap-2 pt-1">
            <input
              type="text"
              value={newSkillInput[catIdx] || ''}
              onChange={(e) => setNewSkillInput({ ...newSkillInput, [catIdx]: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkillItem(catIdx);
                }
              }}
              placeholder="Type skill & press enter (e.g. React, Docker, MongoDB)"
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => addSkillItem(catIdx)}
            >
              Add
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
