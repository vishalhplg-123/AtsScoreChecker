import React from 'react';

export const MinimalTemplate = ({ resume, customization = {} }) => {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = [],
    languages = [],
  } = resume;

  const accentColor = customization.accentColor || '#0f172a';
  const hiddenSections = customization.hiddenSections || [];

  return (
    <div className="w-full h-full bg-white text-slate-800 p-8 font-sans text-[12px] leading-relaxed">
      {/* Minimal Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-light tracking-tight text-slate-950">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-xs font-medium tracking-wider uppercase text-slate-500 mt-1">
          {personalInfo.jobTitle || 'Professional Title'}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-slate-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>}
          {personalInfo.github && <span>• {personalInfo.github.replace(/^https?:\/\//, '')}</span>}
        </div>
      </header>

      {/* Summary */}
      {!hiddenSections.includes('summary') && summary && (
        <section className="mb-5">
          <p className="text-slate-600 leading-relaxed text-[11.5px] border-l-2 pl-3 border-slate-300">
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {!hiddenSections.includes('experience') && experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline">
                  <div className="font-semibold text-slate-900 text-xs">
                    {exp.position} <span className="font-normal text-slate-500">at</span> {exp.company}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.bullets && (
                  <ul className="mt-1 space-y-1 text-slate-600 list-disc list-outside ml-4 text-[11px]">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {!hiddenSections.includes('projects') && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Selected Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div className="flex justify-between items-baseline">
                  <span className="font-semibold text-slate-900 text-xs">{proj.title}</span>
                  {proj.link && (
                    <span className="text-[10px] text-slate-400">{proj.link.replace(/^https?:\/\//, '')}</span>
                  )}
                </div>
                {proj.technologies && (
                  <div className="text-[10px] text-slate-500">{proj.technologies.join(' • ')}</div>
                )}
                {proj.bullets && (
                  <ul className="mt-0.5 space-y-0.5 text-slate-600 list-disc list-outside ml-4 text-[11px]">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {!hiddenSections.includes('skills') && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Skills
          </h2>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {skills.map((cat, idx) => (
              <div key={idx}>
                <span className="font-semibold text-slate-700">{cat.category}: </span>
                <span className="text-slate-600">{cat.items?.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {!hiddenSections.includes('education') && education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="flex justify-between items-baseline text-xs">
                <div>
                  <span className="font-semibold text-slate-900">{edu.degree}</span> in {edu.fieldOfStudy}
                  <div className="text-[10.5px] text-slate-500">{edu.institution}</div>
                </div>
                <span className="text-[10px] text-slate-400">
                  {edu.startDate} — {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
