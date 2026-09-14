import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Target,
  FileText,
} from 'lucide-react';
import { resumeService } from '../../services/resumeService';
import { aiService } from '../../services/aiService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const ATSChecker = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await resumeService.getResumes();
        const list = res.data || [];
        setResumes(list);
        if (list.length > 0) {
          setSelectedResumeId(list[0]._id);
          // Set initial cached analysis if available
          if (list[0].lastAtsAnalysis) {
            setAnalysisResult(list[0].lastAtsAnalysis);
          }
        }
      } catch (err) {
        console.error('Failed to load resumes:', err);
      }
    };
    fetchResumes();
  }, []);

  const handleAnalyze = async () => {
    if (!selectedResumeId) {
      showError('Please select a resume to analyze.');
      return;
    }

    setLoading(true);
    try {
      const selectedResume = resumes.find((r) => r._id === selectedResumeId);
      const res = await aiService.analyzeResume({
        resumeId: selectedResumeId,
        resumeData: selectedResume,
        jobDescription,
      });

      if (res.data) {
        setAnalysisResult(res.data);
        showSuccess('ATS Analysis completed!');
      }
    } catch (err) {
      showError('Failed to complete ATS analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-emerald-600" />
          ATS Resume Score & Gap Checker
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Scan your resume against job descriptions to discover missing keywords, measure action verbs, and maximize interview call-backs.
        </p>
      </div>

      {/* Input Configuration Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <Card className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Select Resume
              </label>
              <select
                value={selectedResumeId}
                onChange={(e) => {
                  setSelectedResumeId(e.target.value);
                  const found = resumes.find((r) => r._id === e.target.value);
                  if (found?.lastAtsAnalysis) setAnalysisResult(found.lastAtsAnalysis);
                }}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white font-medium"
              >
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.title} ({r.template || 'Modern'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                2. Target Job Description (Optional for deep matching)
              </label>
              <textarea
                rows={8}
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the target job description here (e.g. required skills, responsibilities, years of experience)..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white leading-relaxed"
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={Sparkles}
              loading={loading}
              onClick={handleAnalyze}
              className="w-full"
            >
              Analyze Resume ATS
            </Button>
          </Card>
        </div>

        {/* Right Results Area (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          {analysisResult ? (
            <div className="space-y-6">
              {/* Score Highlight Box */}
              <Card className="p-6 bg-gradient-to-br from-emerald-50/70 via-white to-brand-50/50 border-emerald-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Overall ATS Score
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-slate-900 font-display">
                      {analysisResult.overallScore}
                      <span className="text-xl font-normal text-slate-400">/100</span>
                    </div>
                    <p className="text-xs font-semibold text-emerald-700">
                      {analysisResult.atsReadability || 'High ATS Readability'}
                    </p>
                  </div>

                  {/* Sub Scores Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs w-full sm:w-auto">
                    <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                      <div className="text-slate-400 font-medium">Keywords Match</div>
                      <div className="font-bold text-slate-900 text-sm">
                        {analysisResult.scores?.keywordMatch}%
                      </div>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                      <div className="text-slate-400 font-medium">Experience & Metrics</div>
                      <div className="font-bold text-slate-900 text-sm">
                        {analysisResult.scores?.experienceRelevance}%
                      </div>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                      <div className="text-slate-400 font-medium">Skills Coverage</div>
                      <div className="font-bold text-slate-900 text-sm">
                        {analysisResult.scores?.skillsMatch}%
                      </div>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
                      <div className="text-slate-400 font-medium">Structure & Format</div>
                      <div className="font-bold text-slate-900 text-sm">
                        {analysisResult.scores?.formattingQuality}%
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Matched vs Missing Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Matched Keywords */}
                <Card className="p-4 space-y-2 border-emerald-100">
                  <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" /> Matched Keywords ({analysisResult.matchedKeywords?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                    {analysisResult.matchedKeywords?.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded text-[11px] font-semibold">
                        ✓ {kw}
                      </span>
                    ))}
                    {(!analysisResult.matchedKeywords || analysisResult.matchedKeywords.length === 0) && (
                      <span className="text-xs text-slate-400">None detected</span>
                    )}
                  </div>
                </Card>

                {/* Missing Keywords */}
                <Card className="p-4 space-y-2 border-rose-100">
                  <div className="text-xs font-bold text-rose-700 flex items-center gap-1.5 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" /> Missing Key Terms ({analysisResult.missingKeywords?.length || 0})
                  </div>
                  <div className="flex flex-wrap gap-1 max-h-40 overflow-y-auto">
                    {analysisResult.missingKeywords?.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 bg-rose-50 text-rose-800 rounded text-[11px] font-semibold">
                        + {kw}
                      </span>
                    ))}
                    {(!analysisResult.missingKeywords || analysisResult.missingKeywords.length === 0) && (
                      <span className="text-xs text-emerald-600 font-semibold">No missing keywords!</span>
                    )}
                  </div>
                </Card>
              </div>

              {/* Actionable Recommendations */}
              <Card className="p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Actionable Improvement Checklist
                </h3>

                <div className="space-y-3">
                  {analysisResult.recommendations?.map((rec, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{rec.title}</span>
                        <Badge
                          variant={rec.priority === 'high' ? 'danger' : rec.priority === 'medium' ? 'warning' : 'success'}
                          size="sm"
                        >
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ) : (
            <Card className="p-12 text-center space-y-3 flex flex-col items-center justify-center min-h-[350px]">
              <ShieldCheck className="w-12 h-12 text-slate-300" />
              <h3 className="text-sm font-bold text-slate-700">Ready to Scan</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Select your resume and optionally paste a job description on the left to generate instant ATS scores and keyword matches.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
