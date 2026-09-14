import React from 'react';
import { Terminal, Github, Globe, Mail, Phone, MapPin, Code, Cpu, Layers } from 'lucide-react';

export const DeveloperTemplate = ({ resume, customization = {} }) => {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = resume;

  const accentColor = customization.accentColor || '#059669'; // Emerald
  const hiddenSections = customization.hiddenSections || [];

  return (
    <div className="w-full h-full bg-white text-slate-800 p-7 font-sans text-[12px] leading-relaxed">
      {/* Dev Header */}
      <header className="border-b-2 pb-4 mb-4" style={{ borderColor: accentColor }}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5" style={{ color: accentColor }} />
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
                {personalInfo.fullName || 'developer.init()'}
              </h1>
            </div>
            <p className="text-xs font-semibold text-slate-600 mt-1">
              &gt; {personalInfo.jobTitle || 'Full Stack Engineer'}
            </p>
          </div>

          <div className="text-right text-[11px] font-mono space-y-0.5 text-slate-600">
            {personalInfo.email && <div>{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
          </div>
        </div>

        {/* Links bar */}
        <div className="flex flex-wrap gap-3 mt-3 pt-2 text-[11px] font-mono">
          {personalInfo.github && (
            <span className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              <Github className="w-3.5 h-3.5" /> {personalInfo.github.replace(/^https?:\/\//, '')}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              in/ {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              <Globe className="w-3.5 h-3.5" /> {personalInfo.website.replace(/^https?:\/\//, '')}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {!hiddenSections.includes('summary') && summary && (
        <section className="mb-4">
          <p className="text-slate-700 text-[11.5px] leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
            {summary}
          </p>
        </section>
      )}

      {/* Skills Grid */}
      {!hiddenSections.includes('skills') && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5">
            <Code className="w-3.5 h-3.5" style={{ color: accentColor }} />
            Tech Stack & Competencies
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {skills.map((cat, idx) => (
              <div key={idx} className="bg-slate-50 p-2 rounded border border-slate-200">
                <span className="font-mono text-[10px] font-bold text-slate-500 uppercase block mb-1">
                  // {cat.category}
                </span>
                <div className="flex flex-wrap gap-1">
                  {cat.items?.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10.5px] font-mono text-slate-800"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {!hiddenSections.includes('experience') && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" style={{ color: accentColor }} />
            Work History
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline font-mono text-xs">
                  <span className="font-bold text-slate-900">{exp.position}</span>
                  <span className="text-[10.5px] text-slate-500">
                    [{exp.startDate} – {exp.current ? 'Present' : exp.endDate}]
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-700">
                  @ {exp.company} <span className="text-slate-400 font-normal">({exp.location})</span>
                </div>
                {exp.bullets && (
                  <ul className="mt-1 space-y-1 text-slate-700 list-disc list-outside ml-4 text-[11px]">
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
        <section className="mb-4">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" style={{ color: accentColor }} />
            Production Projects & Open Source
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs font-mono">{proj.title}</span>
                  {proj.github && (
                    <span className="text-[10.5px] text-emerald-700 font-mono underline">
                      {proj.github.replace(/^https?:\/\//, '')}
                    </span>
                  )}
                </div>
                {proj.technologies && (
                  <div className="flex flex-wrap gap-1 my-1">
                    {proj.technologies.map((t, tIdx) => (
                      <span key={tIdx} className="text-[9.5px] font-mono px-1 bg-emerald-50 text-emerald-800 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
                {proj.bullets && (
                  <ul className="space-y-0.5 text-slate-700 list-disc list-outside ml-4 text-[11px]">
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

      {/* Education */}
      {!hiddenSections.includes('education') && education.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-1">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="flex justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</span> —{' '}
                  <span className="text-slate-600">{edu.institution}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
