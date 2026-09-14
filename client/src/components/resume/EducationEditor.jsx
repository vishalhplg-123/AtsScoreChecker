import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../common/Button';

export const EducationEditor = () => {
  const { resume, setResume } = useResume();
  const educationList = resume.education || [];

  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      location: '',
      startDate: '2020',
      endDate: '2024',
      current: false,
      gpa: '',
      highlights: [],
    };
    setResume((prev) => ({
      ...prev,
      education: [...(prev.education || []), newEdu],
    }));
  };

  const updateEduField = (idx, field, value) => {
    setResume((prev) => {
      const list = [...(prev.education || [])];
      list[idx] = { ...list[idx], [field]: value };
      return { ...prev, education: list };
    });
  };

  const removeEducation = (idx) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          List your university degrees, colleges, and relevant academic credentials.
        </p>
        <Button variant="secondary" size="sm" icon={Plus} onClick={addEducation}>
          Add Degree
        </Button>
      </div>

      {educationList.map((edu, idx) => (
        <div
          key={edu.id || idx}
          className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/90 space-y-3 relative group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Degree #{idx + 1}
            </span>
            <button
              type="button"
              onClick={() => removeEducation(idx)}
              className="text-slate-400 hover:text-rose-600 transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Institution *</label>
              <input
                type="text"
                value={edu.institution || ''}
                onChange={(e) => updateEduField(idx, 'institution', e.target.value)}
                placeholder="e.g. Stanford University, NIT"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Degree / Qualification *</label>
              <input
                type="text"
                value={edu.degree || ''}
                onChange={(e) => updateEduField(idx, 'degree', e.target.value)}
                placeholder="e.g. B.S., B.Tech, M.S."
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Field of Study</label>
              <input
                type="text"
                value={edu.fieldOfStudy || ''}
                onChange={(e) => updateEduField(idx, 'fieldOfStudy', e.target.value)}
                placeholder="e.g. Computer Science & Engineering"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Start Year</label>
                <input
                  type="text"
                  value={edu.startDate || ''}
                  onChange={(e) => updateEduField(idx, 'startDate', e.target.value)}
                  placeholder="e.g. 2018"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">End Year</label>
                <input
                  type="text"
                  value={edu.endDate || ''}
                  onChange={(e) => updateEduField(idx, 'endDate', e.target.value)}
                  placeholder="e.g. 2022"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">GPA / Score (Optional)</label>
              <input
                type="text"
                value={edu.gpa || ''}
                onChange={(e) => updateEduField(idx, 'gpa', e.target.value)}
                placeholder="e.g. 3.9 / 4.0 or 8.8 / 10"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 bg-white"
              />
            </div>
          </div>
        </div>
      ))}

      {educationList.length === 0 && (
        <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 mb-2">No education entries added yet.</p>
          <Button variant="secondary" size="sm" icon={Plus} onClick={addEducation}>
            Add Education
          </Button>
        </div>
      )}
    </div>
  );
};
