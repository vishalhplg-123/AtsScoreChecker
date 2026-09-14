import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Sparkles, Copy, Download, Check, Edit3, Trash2, Plus } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import confetti from 'canvas-confetti';
import { coverLetterService } from '../../services/coverLetterService';
import { resumeService } from '../../services/resumeService';
import { aiService } from '../../services/aiService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export const CoverLetterGenerator = () => {
  const location = useLocation();
  const navState = location.state || {};

  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(navState.resumeId || '');
  const [company, setCompany] = useState(navState.company || '');
  const [jobTitle, setJobTitle] = useState(navState.jobTitle || '');
  const [jobDescription, setJobDescription] = useState(navState.jobDescription || '');
  const [tone, setTone] = useState('professional'); // 'professional', 'confident', 'concise', 'friendly'
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedLetters, setSavedLetters] = useState([]);
  const [copied, setCopied] = useState(false);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumesRes, lettersRes] = await Promise.all([
          resumeService.getResumes(),
          coverLetterService.getCoverLetters(),
        ]);
        const rList = resumesRes.data || [];
        setResumes(rList);
        if (rList.length > 0 && !selectedResumeId) {
          setSelectedResumeId(rList[0]._id);
        }
        setSavedLetters(lettersRes.data || []);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      }
    };
    fetchData();
  }, []);

  const handleGenerate = async () => {
    if (!company || !jobTitle) {
      showError('Please enter both Company name and Job title.');
      return;
    }

    setLoading(true);
    try {
      const selectedResume = resumes.find((r) => r._id === selectedResumeId);
      const res = await aiService.generateCoverLetter({
        resumeData: selectedResume || {},
        company,
        jobTitle,
        jobDescription,
        tone,
      });

      if (res.data?.fullText) {
        setGeneratedLetter(res.data.fullText);
        showSuccess('Cover letter generated!');
      }
    } catch (err) {
      showError('Failed to generate cover letter.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedLetter) return;
    try {
      const res = await coverLetterService.createCoverLetter({
        title: `${company} - ${jobTitle} Cover Letter`,
        recipient: { company, name: 'Hiring Team' },
        jobTitle,
        jobDescription,
        tone,
        content: generatedLetter,
        resumeUsed: selectedResumeId || null,
      });
      showSuccess('Cover letter saved to your library!');
      setSavedLetters([res.data, ...savedLetters]);
    } catch (err) {
      showError('Failed to save cover letter.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    showSuccess('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('cover-letter-preview');
    if (!element) return;

    try {
      const opt = {
        margin: 15,
        filename: `${company.replace(/\s+/g, '_')}_Cover_Letter.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      await html2pdf().set(opt).from(element).save();
      confetti({ particleCount: 50 });
      showSuccess('Cover letter downloaded as PDF!');
    } catch (e) {
      showError('Failed to export PDF.');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
          <Mail className="w-7 h-7 text-violet-600" />
          AI Cover Letter Generator
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Generate highly customized, recruiter-engaging cover letters tailored to your resume and specific company culture.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Base Resume
              </label>
              <select
                value={selectedResumeId}
                onChange={(e) => setSelectedResumeId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white"
              >
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company *</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Google, Stripe"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title *</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Full Stack SDE"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Tone of Voice
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['professional', 'confident', 'concise', 'friendly'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`py-2 px-3 text-xs font-bold capitalize rounded-xl border transition-all cursor-pointer ${
                      tone === t
                        ? 'border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-500'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Target Job Description
              </label>
              <textarea
                rows={6}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste key responsibilities or requirements..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <Button
              variant="ai"
              size="lg"
              icon={Sparkles}
              loading={loading}
              onClick={handleGenerate}
              className="w-full"
            >
              Generate Letter
            </Button>
          </Card>
        </div>

        {/* Right Preview / Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {generatedLetter ? (
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Custom Cover Letter
                </span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" icon={copied ? Check : Copy} onClick={handleCopy}>
                    {copied ? 'Copied' : 'Copy'}
                  </Button>
                  <Button variant="outline" size="sm" icon={Download} onClick={handleDownloadPDF}>
                    PDF
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSave}>
                    Save to Library
                  </Button>
                </div>
              </div>

              {/* Printable Format */}
              <div
                id="cover-letter-preview"
                className="p-6 bg-white border border-slate-200 rounded-xl font-serif text-xs leading-relaxed text-slate-800 space-y-4 min-h-[400px]"
              >
                <textarea
                  rows={16}
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  className="w-full h-full border-none focus:outline-none resize-none font-serif text-xs leading-relaxed text-slate-800 bg-transparent"
                />
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center space-y-3 flex flex-col items-center justify-center min-h-[400px]">
              <Mail className="w-12 h-12 text-slate-300" />
              <h3 className="text-sm font-bold text-slate-700">Ready to Write</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Enter company name and role on the left to create a compelling, tailored cover letter.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
