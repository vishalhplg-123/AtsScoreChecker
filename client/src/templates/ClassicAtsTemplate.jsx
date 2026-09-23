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

export const ClassicAtsTemplate = ({ resume, customization = {} }) => {
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
    customSections = [],
  } = resume;

  const accentColor = customization.accentColor || '#1e293b';
  const hiddenSections = customization.hiddenSections || [];

  return (
    <div className="w-full h-full text-slate-800 leading-relaxed font-serif text-[13px]">
      {/* Header */}
      <header className="border-b-2 pb-4 mb-4 text-center" style={{ borderColor: accentColor }}>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-sm font-semibold tracking-wide mt-1" style={{ color: accentColor }}>
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact info list */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
          {personalInfo.email && (
            <a
              href={formatMailto(personalInfo.email)}
              className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> {personalInfo.email}
            </a>
          )}
          {personalInfo.phone && (
            <a
              href={formatTel(personalInfo.phone)}
              className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> {personalInfo.phone}
            </a>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <a
              href={formatLinkedInUrl(personalInfo.linkedin)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" /> {formatDisplayUrl(personalInfo.linkedin)}
            </a>
          )}
          {personalInfo.github && (
            <a
              href={formatGitHubUrl(personalInfo.github)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              <Github className="w-3.5 h-3.5" /> {formatDisplayUrl(personalInfo.github)}
            </a>
          )}
          {personalInfo.website && (
            <a
              href={formatWebsiteUrl(personalInfo.website)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-slate-900 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" /> {formatDisplayUrl(personalInfo.website)}
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {!hiddenSections.includes('summary') && summary && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2"
            style={{ color: accentColor, borderColor: '#cbd5e1' }}
          >
            Professional Summary
          </h2>
          <p className="text-justify text-slate-700 leading-normal">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {!hiddenSections.includes('experience') && experience.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2.5"
            style={{ color: accentColor, borderColor: '#cbd5e1' }}
          >
            Work Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={exp.id || idx}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-sm">
                  <span>{exp.position}</span>
                  <span className="text-xs font-normal text-slate-600">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 italic mb-1">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
                    {exp.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-snug">
                        {b}
                      </li>
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
            className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2.5"
            style={{ color: accentColor, borderColor: '#cbd5e1' }}
          >
            Key Projects
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj, idx) => (
              <div key={proj.id || idx}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                  <span>
                    {proj.title}{' '}
                    {proj.subtitle && <span className="font-normal italic text-slate-600">| {proj.subtitle}</span>}
                  </span>
                  {proj.link && (
                    <a
                      href={formatWebsiteUrl(proj.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-normal text-blue-600 underline hover:text-blue-800"
                    >
                      {formatDisplayUrl(proj.link)}
                    </a>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="text-[11px] text-slate-600 mb-1">
                    <span className="font-semibold">Technologies:</span> {proj.technologies.join(', ')}
                  </div>
                )}
                {proj.bullets && proj.bullets.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-slate-700">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="leading-snug">
                        {b}
                      </li>
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
            className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2"
            style={{ color: accentColor, borderColor: '#cbd5e1' }}
          >
            Technical & Professional Skills
          </h2>
          <div className="space-y-1 text-xs">
            {skills.map((cat, idx) => (
              <div key={idx}>
                <span className="font-bold text-slate-800">{cat.category}: </span>
                <span className="text-slate-700">{cat.items?.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {!hiddenSections.includes('education') && education.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2"
            style={{ color: accentColor, borderColor: '#cbd5e1' }}
          >
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div key={edu.id || idx}>
                <div className="flex justify-between items-baseline font-bold text-slate-900 text-xs">
                  <span>
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  <span className="text-slate-600 font-normal">
                    {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 italic">
                  <span>{edu.institution}</span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {!hiddenSections.includes('certifications') && certifications.length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-wider border-b pb-0.5 mb-2"
            style={{ color: accentColor, borderColor: '#cbd5e1' }}
          >
            Certifications
          </h2>
          <div className="space-y-1 text-xs">
            {certifications.map((c, idx) => (
              <div key={c.id || idx} className="flex justify-between">
                <span className="font-semibold text-slate-800">
                  {c.name} — <span className="font-normal italic text-slate-600">{c.issuer}</span>
                </span>
                <span className="text-slate-500">{c.issueDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
