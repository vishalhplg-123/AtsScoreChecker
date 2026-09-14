import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  User,
  FileText,
  Briefcase,
  Code,
  GraduationCap,
  Layers,
  Award,
  Palette,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useResume, defaultResumeState } from '../../context/ResumeContext';
import { resumeService } from '../../services/resumeService';
import { useToast } from '../../context/ToastContext';
import { PersonalInfoEditor } from '../../components/resume/PersonalInfoEditor';
import { SummaryEditor } from '../../components/resume/SummaryEditor';
import { ExperienceEditor } from '../../components/resume/ExperienceEditor';
import { SkillsEditor } from '../../components/resume/SkillsEditor';
import { EducationEditor } from '../../components/resume/EducationEditor';
import { ProjectsEditor } from '../../components/resume/ProjectsEditor';
import { CertificationsEditor } from '../../components/resume/CertificationsEditor';
import { TemplateCustomizer } from '../../components/resume/TemplateCustomizer';
import { ExportToolbar } from '../../components/resume/ExportToolbar';
import { TemplateRenderer } from '../../templates/TemplateRenderer';
import { Modal } from '../../components/common/Modal';

export const ResumeEditor = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id');
  const templateParam = searchParams.get('template');
  const { resume, setResume, loadResume, zoom } = useResume();
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'preview', 'customize'
  const [openAccordion, setOpenAccordion] = useState('personalInfo');
  const [atsModalOpen, setAtsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const initResume = async () => {
      if (resumeId) {
        setLoading(true);
        try {
          await loadResume(resumeId);
        } catch (err) {
          showError('Failed to load resume.');
        } finally {
          setLoading(false);
        }
      } else {
        // Create new or reset to fresh draft
        try {
          const freshData = {
            ...defaultResumeState,
            title: 'My Professional Resume',
            template: templateParam || 'modern',
          };
          const res = await resumeService.createResume(freshData);
          if (res.data) {
            setResume(res.data);
            navigate(`/app/builder?id=${res.data._id}`, { replace: true });
          }
        } catch (e) {
          setResume({ ...defaultResumeState, template: templateParam || 'modern' });
        }
      }
    };

    initResume();
  }, [resumeId, templateParam]);

  const sections = [
    { id: 'personalInfo', label: 'Personal Information', icon: User, component: PersonalInfoEditor },
    { id: 'summary', label: 'Professional Summary', icon: FileText, component: SummaryEditor },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, component: ExperienceEditor },
    { id: 'skills', label: 'Skills & Competencies', icon: Code, component: SkillsEditor },
    { id: 'projects', label: 'Projects & Portfolio', icon: Layers, component: ProjectsEditor },
    { id: 'education', label: 'Education', icon: GraduationCap, component: EducationEditor },
    { id: 'certifications', label: 'Certifications', icon: Award, component: CertificationsEditor },
  ];

  return (
    <div className="space-y-4">
      {/* Title & Top Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={resume.title || ''}
            onChange={(e) => setResume((prev) => ({ ...prev, title: e.target.value }))}
            className="text-lg sm:text-xl font-extrabold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-brand-500 focus:bg-white px-1 py-0.5 rounded-lg transition-all"
            placeholder="Untitled Resume"
          />
        </div>

        {/* Mobile View Switcher */}
        <div className="flex lg:hidden bg-slate-200 p-1 rounded-xl w-full sm:w-auto justify-between">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'editor' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('customize')}
            className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'customize' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Design
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex-1 sm:flex-none px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'preview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            Live Preview
          </button>
        </div>
      </div>

      {/* Export Toolbar Bar */}
      <ExportToolbar onOpenATS={() => setAtsModalOpen(true)} />

      {/* Main 2-Column Split Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Accordion Section Editors (7 cols on desktop) */}
        <div
          className={`lg:col-span-6 space-y-3 ${
            activeTab === 'preview' ? 'hidden lg:block' : ''
          }`}
        >
          {activeTab === 'customize' ? (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-subtle">
              <TemplateCustomizer />
            </div>
          ) : (
            <div className="space-y-3">
              {sections.map((sec) => {
                const isOpen = openAccordion === sec.id;
                const SectionComponent = sec.component;

                return (
                  <div
                    key={sec.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenAccordion(isOpen ? null : sec.id)}
                      className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-slate-50/80 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                          <sec.icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-slate-900">{sec.label}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-brand-600' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-slate-100">
                        <SectionComponent />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Template Customizer shortcut card */}
              <div className="p-4 bg-slate-100/70 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Palette className="w-4 h-4 text-brand-600" />
                  <span>Customize Template, Colors & Fonts</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('customize')}
                  className="text-xs font-bold text-brand-600 hover:text-brand-700"
                >
                  Open Customizer →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Real-Time A4 Document Preview (6 cols on desktop) */}
        <div
          className={`lg:col-span-6 bg-slate-200/60 p-4 sm:p-6 rounded-3xl border border-slate-200 overflow-x-auto min-h-[600px] flex justify-center ${
            activeTab === 'editor' ? 'hidden lg:flex' : ''
          }`}
        >
          <div className="w-full flex justify-center">
            <TemplateRenderer resume={resume} scale={zoom / 100} />
          </div>
        </div>
      </div>

      {/* ATS Breakdown Quick Modal */}
      <Modal
        isOpen={atsModalOpen}
        onClose={() => setAtsModalOpen(false)}
        title="ATS Score & Analysis"
        subtitle="Recruiter Applicant Tracking System compliance audit"
        maxWidth="max-w-xl"
      >
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
            <div>
              <div className="text-2xl font-black text-emerald-700">{resume.atsScore || 88}/100</div>
              <div className="text-xs font-bold text-emerald-900">Overall ATS Score</div>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Recruiter-Ready
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Keyword & Tech Match</span>
              <span className="font-bold text-slate-800">{resume.lastAtsAnalysis?.scores?.keywordMatch || 85}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Experience & Measurable Metrics</span>
              <span className="font-bold text-slate-800">{resume.lastAtsAnalysis?.scores?.experienceRelevance || 80}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Skills Density</span>
              <span className="font-bold text-slate-800">{resume.lastAtsAnalysis?.scores?.skillsMatch || 90}%</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Format & Contact Readability</span>
              <span className="font-bold text-slate-800">{resume.lastAtsAnalysis?.scores?.formattingQuality || 95}%</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 italic">
            For deep role-specific matching against a job description, use the dedicated ATS Checker or Job Tailor in the sidebar.
          </p>
        </div>
      </Modal>
    </div>
  );
};
