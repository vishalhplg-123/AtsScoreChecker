import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';
import {
  formatMailto,
  formatTel,
  formatGitHubUrl,
  formatLinkedInUrl,
  formatWebsiteUrl,
  formatDisplayUrl,
} from '../utils/linkUtils';

export const ProfessionalTemplate = ({ resume, customization = {} }) => {
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

  const accentColor = customization.accentColor || '#1e3a8a'; // Deep Navy
  const hiddenSections = customization.hiddenSections || [];

  return (
    <div className="w-full h-full bg-white text-slate-800 p-8 font-sans text-[12px] leading-relaxed">
      {/* Executive Header */}
      <header className="border-b-4 pb-4 mb-5" style={{ borderColor: accentColor }}>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-sm font-semibold tracking-wider uppercase mt-0.5" style={{ color: accentColor }}>
              {personalInfo.jobTitle || 'Professional Role'}
            </p>
          </div>

          <div className="text-right text-[11px] text-slate-600 space-y-0.5">
            {personalInfo.email && (
              <a
                href={formatMailto(personalInfo.email)}
                className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors"
              >
                <Mail className="w-3 h-3" /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <a
                href={formatTel(personalInfo.phone)}
                className="flex items-center justify-end gap-1 hover:text-slate-900 transition-colors"
              >
                <Phone className="w-3 h-3" /> {personalInfo.phone}
              </a>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-end gap-1">
                <MapPin className="w-3 h-3" /> {personalInfo.location}
              </div>
            )}
          </div>
        </div>

        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <div className="mt-2 text-[10.5px] text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
            {personalInfo.linkedin && (
              <a
                href={formatLinkedInUrl(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-800 transition-colors"
              >
                <Linkedin className="w-3 h-3" /> {formatDisplayUrl(personalInfo.linkedin)}
              </a>
            )}
            {personalInfo.github && (
              <a
                href={formatGitHubUrl(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-800 transition-colors"
              >
                <Github className="w-3 h-3" /> {formatDisplayUrl(personalInfo.github)}
              </a>
            )}
            {personalInfo.website && (
              <a
                href={formatWebsiteUrl(personalInfo.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-slate-800 transition-colors"
              >
                <Globe className="w-3 h-3" /> {formatDisplayUrl(personalInfo.website)}
              </a>
            )}
          </div>
        )}
      </header>

      {/* Summary */}
      {!hiddenSections.includes('summary') && summary && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 mb-2 rounded-sm inline-block"
            style={{ backgroundColor: accentColor }}
          >
            Executive Profile
          </h2>
          <p className="text-slate-700 leading-relaxed text-[11.5px]">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {!hiddenSections.includes('experience') && experience.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 mb-3 rounded-sm inline-block"
            style={{ backgroundColor: accentColor }}
          >
            Professional Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">{exp.position}</span>
                  <span className="text-[10.5px] font-semibold text-slate-500">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-700 italic">
                  {exp.company}, {exp.location}
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
          <h2
            className="text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 mb-2.5 rounded-sm inline-block"
            style={{ backgroundColor: accentColor }}
          >
            Major Initiatives & Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-xs">{proj.title}</span>
                  {proj.link && (
                    <a
                      href={formatWebsiteUrl(proj.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-slate-500 hover:underline hover:text-slate-800"
                    >
                      {formatDisplayUrl(proj.link)}
                    </a>
                  )}
                </div>
                {proj.technologies && (
                  <div className="text-[10px] font-medium text-slate-500 mb-0.5">
                    Scope: {proj.technologies.join(', ')}
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

      {/* Skills */}
      {!hiddenSections.includes('skills') && skills.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 mb-2 rounded-sm inline-block"
            style={{ backgroundColor: accentColor }}
          >
            Core Competencies
          </h2>
          <div className="space-y-1 text-xs">
            {skills.map((cat, idx) => (
              <div key={idx}>
                <span className="font-bold text-slate-800">{cat.category}: </span>
                <span className="text-slate-700">{cat.items?.join(' • ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Credentials */}
      {!hiddenSections.includes('education') && education.length > 0 && (
        <section className="mb-3">
          <h2
            className="text-xs font-bold uppercase tracking-wider text-white px-2 py-0.5 mb-2 rounded-sm inline-block"
            style={{ backgroundColor: accentColor }}
          >
            Education & Qualifications
          </h2>
          <div className="space-y-1.5">
            {education.map((edu, idx) => (
              <div key={edu.id || idx} className="flex justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</span> — {edu.institution}
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
