import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Award, BookOpen, Briefcase } from 'lucide-react';
import {
  formatMailto,
  formatTel,
  formatGitHubUrl,
  formatLinkedInUrl,
  formatWebsiteUrl,
  formatDisplayUrl,
} from '../utils/linkUtils';

export const ModernTemplate = ({ resume, customization = {} }) => {
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

  const accentColor = customization.accentColor || '#2563eb';
  const hiddenSections = customization.hiddenSections || [];

  return (
    <div className="w-full h-full bg-white text-slate-800 flex flex-col font-sans text-[12px] leading-relaxed">
      {/* Header Banner */}
      <header className="p-6 text-white rounded-t-lg" style={{ backgroundColor: accentColor }}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-sm font-medium text-white/90 mt-0.5 tracking-wide">
              {personalInfo.jobTitle || 'Professional Title'}
            </p>
          </div>

          <div className="text-right text-[11px] text-white/90 space-y-1">
            {personalInfo.email && (
              <a
                href={formatMailto(personalInfo.email)}
                className="flex items-center justify-end gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3 h-3" /> {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && (
              <a
                href={formatTel(personalInfo.phone)}
                className="flex items-center justify-end gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3 h-3" /> {personalInfo.phone}
              </a>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-end gap-1.5">
                <MapPin className="w-3 h-3" /> {personalInfo.location}
              </div>
            )}
          </div>
        </div>

        {/* Links row */}
        {(personalInfo.linkedin || personalInfo.github || personalInfo.website) && (
          <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-white/20 text-[11px] text-white/95">
            {personalInfo.linkedin && (
              <a
                href={formatLinkedInUrl(personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Linkedin className="w-3 h-3" /> {formatDisplayUrl(personalInfo.linkedin)}
              </a>
            )}
            {personalInfo.github && (
              <a
                href={formatGitHubUrl(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Github className="w-3 h-3" /> {formatDisplayUrl(personalInfo.github)}
              </a>
            )}
            {personalInfo.website && (
              <a
                href={formatWebsiteUrl(personalInfo.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Globe className="w-3 h-3" /> {formatDisplayUrl(personalInfo.website)}
              </a>
            )}
          </div>
        )}
      </header>

      {/* Body 2-Column Grid */}
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Left / Main Column (7 cols) */}
        <div className="col-span-7 space-y-5">
          {/* Summary */}
          {!hiddenSections.includes('summary') && summary && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                About Me
              </h2>
              <p className="text-slate-600 text-justify text-[11.5px] leading-relaxed">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {!hiddenSections.includes('experience') && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={exp.id || idx} className="relative pl-3 border-l-2 border-slate-200">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-xs">{exp.position}</h3>
                      <span className="text-[10.5px] text-slate-500 font-medium">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium" style={{ color: accentColor }}>
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1.5 space-y-1 text-slate-600 list-disc list-outside ml-3 text-[11px]">
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
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj, idx) => (
                  <div key={proj.id || idx}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold text-slate-900 text-xs">{proj.title}</h3>
                      {proj.link && (
                        <a
                          href={formatWebsiteUrl(proj.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-slate-500 hover:underline hover:text-brand-600"
                        >
                          {formatDisplayUrl(proj.link)}
                        </a>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1 mb-1">
                        {proj.technologies.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[9.5px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.bullets && (
                      <ul className="space-y-0.5 text-slate-600 list-disc list-outside ml-3 text-[11px]">
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
        </div>

        {/* Right Sidebar (5 cols) */}
        <div className="col-span-5 space-y-5 border-l border-slate-100 pl-6">
          {/* Skills */}
          {!hiddenSections.includes('skills') && skills.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5">
                Skills & Tech
              </h2>
              <div className="space-y-3">
                {skills.map((cat, idx) => (
                  <div key={idx}>
                    <h4 className="text-[10.5px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      {cat.category}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {cat.items?.map((item, iIdx) => (
                        <span
                          key={iIdx}
                          className="px-2 py-0.5 text-[10.5px] font-medium rounded-md bg-slate-100 text-slate-800"
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

          {/* Education */}
          {!hiddenSections.includes('education') && education.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx}>
                    <h3 className="font-bold text-slate-900 text-xs">{edu.degree}</h3>
                    <div className="text-[11px] text-slate-600">{edu.fieldOfStudy}</div>
                    <div className="text-[10.5px] font-medium" style={{ color: accentColor }}>
                      {edu.institution}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {edu.startDate} – {edu.current ? 'Present' : edu.endDate} {edu.gpa ? `• GPA ${edu.gpa}` : ''}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {!hiddenSections.includes('certifications') && certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((c, idx) => (
                  <div key={c.id || idx} className="text-[11px]">
                    <div className="font-bold text-slate-800">{c.name}</div>
                    <div className="text-slate-500 text-[10px]">{c.issuer} • {c.issueDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {!hiddenSections.includes('languages') && languages.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2">
                Languages
              </h2>
              <div className="space-y-1 text-[11px]">
                {languages.map((l, idx) => (
                  <div key={l.id || idx} className="flex justify-between">
                    <span className="font-medium text-slate-800">{l.language}</span>
                    <span className="text-slate-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
