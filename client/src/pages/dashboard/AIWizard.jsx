import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wand2,
  Sparkles,
  ArrowRight,
  Check,
  Layout,
  Briefcase,
  FileText,
  CheckCircle2,
} from 'lucide-react';
import { aiService } from '../../services/aiService';
import { resumeService } from '../../services/resumeService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

const TEMPLATES = [
  { id: 'modern', name: 'Modern', desc: 'Two-column layout with sidebar' },
  { id: 'classic', name: 'Classic ATS', desc: 'Highest ATS parseability single column' },
  { id: 'developer', name: 'Developer', desc: 'Monospace code accents & tech tags' },
  { id: 'minimal', name: 'Minimal', desc: 'Clean typography and high density' },
  { id: 'professional', name: 'Professional', desc: 'Corporate navy dividers' },
  { id: 'executive', name: 'Executive', desc: 'Luxury centered layout' },
];

export const AIWizard = () => {
  const [step, setStep] = useState(1);
  const [targetRole, setTargetRole] = useState('Senior MERN Stack Developer');
  const [experienceYears, setExperienceYears] = useState('3-5 years');
  const [skills, setSkills] = useState('React.js, Node.js, Express, MongoDB, Tailwind CSS, REST APIs');
  const [jobDescription, setJobDescription] = useState('');
  const [template, setTemplate] = useState('modern');
  const [loading, setLoading] = useState(false);
  const [generatedResume, setGeneratedResume] = useState(null);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const skillsArray = skills.split(',').map((s) => s.trim()).filter(Boolean);
      const res = await aiService.generateInitialResume({
        targetRole,
        experienceYears,
        skills: skillsArray,
        jobDescription,
      });

      if (res.data) {
        setGeneratedResume({
          ...res.data,
          template,
        });
        setStep(6);
        showSuccess('AI generated complete resume draft!');
      }
    } catch (err) {
      showError('Failed to generate initial resume.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAndOpen = async () => {
    if (!generatedResume) return;
    try {
      const res = await resumeService.createResume(generatedResume);
      showSuccess('Resume created! Opening editor...');
      navigate(`/app/builder?id=${res.data._id}`);
    } catch (err) {
      showError('Failed to save resume.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Step Indicator */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
          <Wand2 className="w-3.5 h-3.5" />
          <span>Guided AI Onboarding</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display">
          AI Resume Generator Wizard
        </h1>
        <p className="text-xs text-slate-500">
          Step {step} of 6 — Answer a few questions and let AI build your base resume.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-4">
          <div
            className="bg-brand-600 h-full transition-all duration-300"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      <Card className="p-8 space-y-6">
        {/* Step 1: Target Job Title */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">What is your target job title?</h3>
            <p className="text-xs text-slate-500">
              This helps the AI tune your professional headline, keywords, and action verbs.
            </p>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer, Full Stack Developer, Product Manager"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-white font-medium"
              autoFocus
            />
            <div className="flex justify-end pt-4">
              <Button variant="primary" size="md" icon={ArrowRight} onClick={() => setStep(2)}>
                Next: Experience Level
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Years of Experience */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">How many years of experience do you have?</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Entry / Fresher (0-1 yrs)', 'Junior (1-3 yrs)', 'Mid-Senior (3-5 yrs)', 'Lead / Executive (6+ yrs)'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setExperienceYears(lvl)}
                  className={`p-4 rounded-xl border text-xs font-bold text-left transition-all ${
                    experienceYears === lvl
                      ? 'border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-500'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" size="md" onClick={() => setStep(1)}>Back</Button>
              <Button variant="primary" size="md" icon={ArrowRight} onClick={() => setStep(3)}>
                Next: Skills
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Key Skills */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">What are your core technical skills?</h3>
            <p className="text-xs text-slate-500">
              Comma-separated list of programming languages, frameworks, or tools.
            </p>
            <textarea
              rows={4}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Node.js, TypeScript, MongoDB, Docker, AWS"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 bg-white"
            />
            <div className="flex justify-between pt-4">
              <Button variant="outline" size="md" onClick={() => setStep(2)}>Back</Button>
              <Button variant="primary" size="md" icon={ArrowRight} onClick={() => setStep(4)}>
                Next: Job Description
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Job Description */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Paste target job description (Optional)</h3>
            <p className="text-xs text-slate-500">
              If you have a specific posting in mind, paste it here for precise keyword matching.
            </p>
            <textarea
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description (or leave empty for standard role best practices)..."
              className="w-full px-4 py-3 text-xs rounded-xl border border-slate-200 bg-white"
            />
            <div className="flex justify-between pt-4">
              <Button variant="outline" size="md" onClick={() => setStep(3)}>Back</Button>
              <Button variant="primary" size="md" icon={ArrowRight} onClick={() => setStep(5)}>
                Next: Choose Template
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Choose Template */}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Select your starting template</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplate(t.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    template === t.id
                      ? 'border-brand-600 bg-brand-50 ring-2 ring-brand-500 text-brand-900 shadow-sm'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs">{t.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{t.desc}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-4">
              <Button variant="outline" size="md" onClick={() => setStep(4)}>Back</Button>
              <Button
                variant="ai"
                size="lg"
                icon={Sparkles}
                loading={loading}
                onClick={handleGenerate}
              >
                Generate Resume with AI
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Review & Finalize */}
        {step === 6 && generatedResume && (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Resume generated successfully! Review below before opening in editor.
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs text-slate-700 max-h-72 overflow-y-auto">
              <div>
                <span className="font-bold text-slate-900">Summary:</span>
                <p className="mt-1 leading-relaxed">{generatedResume.summary}</p>
              </div>

              <div>
                <span className="font-bold text-slate-900">Generated Experience:</span>
                <div className="mt-1 space-y-2">
                  {generatedResume.experience?.map((exp, i) => (
                    <div key={i} className="pl-3 border-l-2 border-brand-400">
                      <div className="font-bold">{exp.position} @ {exp.company}</div>
                      <ul className="list-disc ml-4 mt-0.5">
                        {exp.bullets?.map((b, bi) => (
                          <li key={bi}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="primary" size="lg" icon={Check} onClick={handleCreateAndOpen}>
                Accept & Open in Editor
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
