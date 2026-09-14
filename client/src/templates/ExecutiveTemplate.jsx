import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Award, Trophy } from 'lucide-react';

export const ExecutiveTemplate = ({ resume, customization = {} }) => {
  const {
    personalInfo = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
    achievements = [],
  } = resume;

  const accentColor = customization.accentColor || '#7c3aed'; // Violet / Royal
  const hiddenSections = customization.hiddenSections || [];

  return (
    <div className="w-full h-full bg-white text-slate-800 p-8 font-serif text-[12px] leading-relaxed">
      {/* Centered Luxury Header */}
      <header className="text-center pb-4 mb-4 border-b border-slate-300">
        <h1 className="text-2xl font-bold tracking-wider uppercase text-slate-900">
          {personalInfo.fullName || 'Executive Candidate'}
        </h1>
        <p className="text-xs font-semibold tracking-widest uppercase mt-1" style={{ color: accentColor }}>
          {personalInfo.jobTitle || 'Executive & Technical Leader'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-[10.5px] font-sans text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {!hiddenSections.includes('summary') && summary && (
        <section className="mb-4">
          <h2
            className="text-[11px] font-bold uppercase tracking-widest text-center border-b pb-1 mb-2 font-sans"
            style={{ color: accentColor, borderColor: '#e2e8f0' }}
          >
            Executive Summary
          </h2>
          <p className="text-slate-700 leading-relaxed text-justify text-[11.5px]">{summary}</p>
        </section>
      )}

      {/* Key Achievements Banner */}
      {!hiddenSections.includes('achievements') && achievements.length > 0 && (
        <section className="mb-4 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <h2
            className="text-[10.5px] font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5 font-sans"
            style={{ color: accentColor }}
          >
            <Trophy className="w-3.5 h-3.5" /> Key Career Achievements
          </h2>
          <div className="space-y-1 text-xs">
            {achievements.map((ach, idx) => (
              <div key={ach.id || idx}>
                <span className="font-bold text-slate-900">{ach.title}: </span>
                <span className="text-slate-700">{ach.description}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {!hiddenSections.includes('experience') && experience.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-[11px] font-bold uppercase tracking-widest text-center border-b pb-1 mb-3 font-sans"
            style={{ color: accentColor, borderColor: '#e2e8f0' }}
          >
            Leadership & Experience
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline font-sans text-xs">
                  <span className="font-bold text-slate-900">{exp.position}</span>
                  <span className="text-slate-500 font-medium">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-600 italic mb-1">
                  {exp.company} — {exp.location}
                </div>
                {exp.bullets && (
                  <ul className="space-y-1 text-slate-700 list-disc list-outside ml-4 text-[11px]">
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

      {/* Skills */}
      {!hiddenSections.includes('skills') && skills.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-[11px] font-bold uppercase tracking-widest text-center border-b pb-1 mb-2 font-sans"
            style={{ color: accentColor, borderColor: '#e2e8f0' }}
          >
            Areas of Expertise
          </h2>
          <div className="grid grid-cols-2 gap-2 text-xs font-sans">
            {skills.map((cat, idx) => (
              <div key={idx}>
                <span className="font-bold text-slate-900">{cat.category}: </span>
                <span className="text-slate-600">{cat.items?.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {!hiddenSections.includes('education') && education.length > 0 && (
        <section className="mb-3">
          <h2
            className="text-[11px] font-bold uppercase tracking-widest text-center border-b pb-1 mb-2 font-sans"
            style={{ color: accentColor, borderColor: '#e2e8f0' }}
          >
            Education & Board Affiliations
          </h2>
          <div className="space-y-1.5 font-sans">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="flex justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree}</span>, {edu.fieldOfStudy} — {edu.institution}
                </div>
                <span className="text-slate-500 text-[10.5px]">
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
