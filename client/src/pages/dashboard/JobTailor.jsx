import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, Copy, Check, Wand2 } from 'lucide-react';
import { resumeService } from '../../services/resumeService';
import { aiService } from '../../services/aiService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const JobTailor = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [tailorResult, setTailorResult] = useState(null);
  const [copiedBulletIdx, setCopiedBulletIdx] = useState(null);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await resumeService.getResumes();
        const list = res.data || [];
        setResumes(list);
        if (list.length > 0) {
          setSelectedResumeId(list[0]._id);
          setTargetRole(list[0].targetRole || 'Senior Full Stack Developer');
        }
      } catch (err) {
        console.error('Failed to load resumes:', err);
      }
    };
    fetchResumes();
  }, []);

  const handleTailor = async () => {
    if (!selectedResumeId) {
      showError('Please select a resume.');
      return;
    }
    if (!jobDescription || jobDescription.trim().length < 20) {
      showError('Please paste a job description with at least 20 characters.');
      return;
    }

    setLoading(true);
    try {
      const selectedResume = resumes.find((r) => r._id === selectedResumeId);
      const res = await aiService.tailorResume({
        resumeId: selectedResumeId,
        resumeData: selectedResume,
        jobDescription,
      });

      if (res.data) {
        setTailorResult(res.data);
        showSuccess('Resume tailored against job requirements!');
      }
    } catch (err) {
      showError('Failed to tailor resume.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedBulletIdx(idx);
    showSuccess('Copied to clipboard!');
    setTimeout(() => setCopiedBulletIdx(null), 2000);
  };

  const handleGoToCoverLetter = () => {
    navigate('/app/cover-letters', {
      state: {
        company: targetCompany || 'Target Company',
        jobTitle: targetRole || 'Target Role',
        jobDescription,
        resumeId: selectedResumeId,
      },
    });
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
          <Target className="w-7 h-7 text-brand-600" />
          1-Click Job Tailoring Assistant
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Align your authentic experience with job description keywords without inventing fake qualifications.
        </p>
      </div>

      {/* 2-Column Interface */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <Card className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Select Base Resume
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

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Company</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  placeholder="e.g. Stripe, Google"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Lead Engineer"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Target Job Description *
              </label>
              <textarea
                rows={9}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the full job post, responsibilities, and required qualifications..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white leading-relaxed"
              />
            </div>

            <Button
              variant="ai"
              size="lg"
              icon={Sparkles}
              loading={loading}
              onClick={handleTailor}
              className="w-full"
            >
              Tailor Resume Now
            </Button>
          </Card>
        </div>

        {/* Right Output Area (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          {tailorResult ? (
            <div className="space-y-6">
              {/* Match Score Card */}
              <Card className="p-6 bg-gradient-to-br from-brand-50 via-white to-cyan-50 border-brand-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                      Target Match Alignment
                    </span>
                    <div className="text-4xl font-black text-slate-900 font-display mt-1">
                      {tailorResult.matchScore}%
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    icon={Wand2}
                    onClick={handleGoToCoverLetter}
                  >
                    Generate Matching Cover Letter →
                  </Button>
                </div>
              </Card>

              {/* Matched vs Missing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 uppercase">
                    <CheckCircle2 className="w-4 h-4" /> Matched In Your Resume
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tailorResult.matchedKeywords?.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded text-[11px] font-semibold">
                        ✓ {kw}
                      </span>
                    ))}
                  </div>
                </Card>

                <Card className="p-4 space-y-2">
                  <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5 uppercase">
                    <AlertTriangle className="w-4 h-4" /> Missing From Resume
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tailorResult.missingKeywords?.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-rose-50 text-rose-800 rounded text-[11px] font-semibold">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Tailored Summary Recommendation */}
              <Card className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-brand-600" />
                    Recommended Tailored Summary
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={copiedBulletIdx === 'summary' ? Check : Copy}
                    onClick={() => handleCopy(tailorResult.suggestedSummary, 'summary')}
                  >
                    {copiedBulletIdx === 'summary' ? 'Copied' : 'Copy'}
                  </Button>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  {tailorResult.suggestedSummary}
                </div>
              </Card>

              {/* Tailored Bullets */}
              <Card className="p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Tailored Bullet Enhancements (Incorporate If Applicable)
                </h3>
                <div className="space-y-2">
                  {tailorResult.suggestedBullets?.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
                    >
                      <span className="text-slate-800 leading-relaxed">• {bullet}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(bullet, idx)}
                        className="text-slate-400 hover:text-brand-600 p-1 shrink-0"
                        title="Copy Bullet"
                      >
                        {copiedBulletIdx === idx ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-12 text-center space-y-3 flex flex-col items-center justify-center min-h-[350px]">
              <Target className="w-12 h-12 text-slate-300" />
              <h3 className="text-sm font-bold text-slate-700">Ready to Tailor</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Paste any target job description on the left to extract matching keyword synergies and generate custom bullet improvements.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
