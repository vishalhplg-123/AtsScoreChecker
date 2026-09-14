import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Palette, Type, Layout, Eye, EyeOff, Check } from 'lucide-react';

const TEMPLATES = [
  { id: 'classic', name: 'Classic ATS', description: 'Single column, maximum ATS parseability' },
  { id: 'modern', name: 'Modern', description: 'Clean two-column layout with sidebar' },
  { id: 'minimal', name: 'Minimal', description: 'Ultra-clean typography & high density' },
  { id: 'developer', name: 'Developer', description: 'Tech tags, monospace accents, repo links' },
  { id: 'professional', name: 'Professional', description: 'Executive navy headers, corporate polish' },
  { id: 'executive', name: 'Executive', description: 'Centered luxury layout, leadership focused' },
];

const COLOR_PRESETS = [
  '#2563eb', // Blue
  '#4f46e5', // Indigo
  '#059669', // Emerald
  '#0891b2', // Cyan
  '#7c3aed', // Violet
  '#dc2626', // Crimson
  '#1e293b', // Slate Dark
  '#b45309', // Amber
];

const FONTS = [
  { id: 'inter', name: 'Modern (Inter)' },
  { id: 'merriweather', name: 'Classic (Merriweather Serif)' },
  { id: 'jetbrains', name: 'Tech (JetBrains Mono)' },
];

export const TemplateCustomizer = () => {
  const { resume, setTemplate, updateCustomization, toggleSectionVisibility } = useResume();
  const customization = resume.customization || {};
  const currentTemplate = resume.template || 'modern';
  const hiddenSections = customization.hiddenSections || [];

  const sections = [
    { key: 'summary', name: 'Professional Summary' },
    { key: 'experience', name: 'Work Experience' },
    { key: 'projects', name: 'Projects' },
    { key: 'skills', name: 'Skills' },
    { key: 'education', name: 'Education' },
    { key: 'certifications', name: 'Certifications' },
    { key: 'achievements', name: 'Achievements' },
    { key: 'languages', name: 'Languages' },
  ];

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
          <Layout className="w-4 h-4 text-brand-600" />
          Choose Template
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => setTemplate(tpl.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                currentTemplate === tpl.id
                  ? 'border-brand-600 bg-brand-50/50 ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{tpl.name}</span>
                {currentTemplate === tpl.id && <Check className="w-3.5 h-3.5 text-brand-600" />}
              </div>
              <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{tpl.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color Picker */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-brand-600" />
          Accent Color
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => updateCustomization('accentColor', color)}
              className={`w-7 h-7 rounded-full transition-transform cursor-pointer ${
                customization.accentColor === color ? 'scale-125 ring-2 ring-offset-2 ring-slate-800' : 'hover:scale-110'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
          <input
            type="color"
            value={customization.accentColor || '#2563eb'}
            onChange={(e) => updateCustomization('accentColor', e.target.value)}
            className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 p-0.5"
            title="Custom Hex Color"
          />
        </div>
      </div>

      {/* Typography & Spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
            <Type className="w-4 h-4 text-brand-600" />
            Typography
          </label>
          <select
            value={customization.fontFamily || 'inter'}
            onChange={(e) => updateCustomization('fontFamily', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
          >
            {FONTS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Font Size Scale
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl">
            {['small', 'medium', 'large'].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => updateCustomization('fontSize', size)}
                className={`py-1 text-xs font-semibold capitalize rounded-lg transition-all ${
                  (customization.fontSize || 'medium') === size
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Visibility Toggles */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Toggle Section Visibility
        </label>
        <div className="grid grid-cols-2 gap-2">
          {sections.map((sec) => {
            const isHidden = hiddenSections.includes(sec.key);
            return (
              <button
                key={sec.key}
                type="button"
                onClick={() => toggleSectionVisibility(sec.key)}
                className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  isHidden
                    ? 'border-slate-200 bg-slate-50 text-slate-400'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                }`}
              >
                <span>{sec.name}</span>
                {isHidden ? (
                  <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <Eye className="w-3.5 h-3.5 text-brand-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
