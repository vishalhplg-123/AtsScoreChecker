import React, { useState } from 'react';
import { Sparkles, Check, X, RotateCcw, Edit3, ArrowRight, Wand2, Zap, Target } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { aiService } from '../../services/aiService';
import { useToast } from '../../context/ToastContext';

export const AIModal = ({
  isOpen,
  onClose,
  type = 'bullet', // 'bullet', 'summary', 'skills'
  initialText = '',
  targetRole = 'Software Engineer',
  onApply,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentText, setCurrentText] = useState(initialText);
  const [resultData, setResultData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('improved'); // 'improved', 'achievementFocused', 'concise'
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const { showSuccess, showError } = useToast();

  const handleAction = async (actionType) => {
    setLoading(true);
    try {
      if (type === 'bullet') {
        const res = await aiService.improveBullet({
          bullet: currentText || initialText,
          action: actionType,
          role: targetRole,
        });
        if (res.data) {
          setResultData(res.data);
          setEditedText(res.data.improved);
        }
      } else if (type === 'summary') {
        const res = await aiService.generateSummary({
          role: targetRole,
          background: currentText || initialText,
        });
        if (res.data) {
          setResultData(res.data);
          setEditedText(res.data.summaries.standard);
        }
      }
    } catch (err) {
      showError('AI request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    let finalValue = editedText;
    if (!isEditing && resultData) {
      if (type === 'bullet') {
        finalValue = resultData[selectedTab] || resultData.improved;
      } else if (type === 'summary') {
        finalValue = resultData.summaries[selectedTab] || resultData.summaries.standard;
      }
    }
    onApply(finalValue);
    showSuccess('AI suggestion applied!');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ResumeAI Assistant"
      subtitle="Refine and optimize your content with recruiter-grade AI"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Context / Original Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Original Text
          </label>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-700">
            {initialText || <span className="text-slate-400 italic">No initial text provided</span>}
          </div>
        </div>

        {/* AI Action Quick Triggers */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Choose Optimization Goal
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => handleAction('improve')}
              disabled={loading}
              className="flex flex-col items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-brand-400 hover:bg-brand-50/50 transition-all text-left group cursor-pointer"
            >
              <Wand2 className="w-5 h-5 text-brand-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800">Improve Quality</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Stronger action verbs</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction('make_achievement_focused')}
              disabled={loading}
              className="flex flex-col items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/50 transition-all text-left group cursor-pointer"
            >
              <Zap className="w-5 h-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800">Add Metrics (XYZ)</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Quantifiable results</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction('ats_optimize')}
              disabled={loading}
              className="flex flex-col items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-violet-400 hover:bg-violet-50/50 transition-all text-left group cursor-pointer"
            >
              <Target className="w-5 h-5 text-violet-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800">ATS Optimize</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Keyword density</span>
            </button>

            <button
              type="button"
              onClick={() => handleAction('shorten')}
              disabled={loading}
              className="flex flex-col items-center p-3 rounded-xl border border-slate-200 bg-white hover:border-cyan-400 hover:bg-cyan-50/50 transition-all text-left group cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 text-cyan-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-bold text-slate-800">Make Concise</span>
              <span className="text-[10px] text-slate-500 mt-0.5">2-sentence punch</span>
            </button>
          </div>
        </div>

        {/* AI Result Presentation */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 bg-brand-50/30 rounded-2xl border border-brand-100">
            <Sparkles className="w-8 h-8 text-brand-600 animate-spin" />
            <p className="text-sm font-semibold text-brand-900">AI is analyzing and optimizing...</p>
            <p className="text-xs text-brand-600">Applying recruiter psychology and ATS algorithms</p>
          </div>
        ) : resultData ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-brand-600" />
                AI Generated Variations
              </span>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTab(type === 'bullet' ? 'improved' : 'standard');
                    setIsEditing(false);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    (type === 'bullet' && selectedTab === 'improved') ||
                    (type === 'summary' && selectedTab === 'standard')
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Balanced
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTab(type === 'bullet' ? 'achievementFocused' : 'achievement');
                    setIsEditing(false);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    (type === 'bullet' && selectedTab === 'achievementFocused') ||
                    (type === 'summary' && selectedTab === 'achievement')
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Achievement
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTab('concise');
                    setIsEditing(false);
                  }}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    selectedTab === 'concise'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Concise
                </button>
              </div>
            </div>

            {/* Content box */}
            {isEditing ? (
              <div>
                <textarea
                  rows={4}
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full p-3.5 rounded-xl border border-brand-300 focus:ring-2 focus:ring-brand-500 text-sm leading-relaxed text-slate-800"
                />
              </div>
            ) : (
              <div className="p-4 bg-gradient-to-br from-brand-50/50 via-white to-indigo-50/30 rounded-xl border border-brand-200 text-sm leading-relaxed text-slate-800 shadow-subtle">
                {type === 'bullet'
                  ? resultData[selectedTab] || resultData.improved
                  : resultData.summaries[selectedTab] || resultData.summaries.standard}
              </div>
            )}

            {resultData.explanation && (
              <p className="text-xs text-slate-500 italic">💡 {resultData.explanation}</p>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-slate-100 gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  icon={RotateCcw}
                  onClick={() => handleAction('improve')}
                >
                  Regenerate
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Edit3}
                  onClick={() => {
                    const text =
                      type === 'bullet'
                        ? resultData[selectedTab] || resultData.improved
                        : resultData.summaries[selectedTab] || resultData.summaries.standard;
                    setEditedText(text);
                    setIsEditing(!isEditing);
                  }}
                >
                  {isEditing ? 'View Original' : 'Edit Manually'}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" icon={X} onClick={onClose}>
                  Reject
                </Button>
                <Button variant="ai" size="sm" icon={Check} onClick={handleAccept}>
                  Accept & Apply
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-xs text-slate-500">
              Select one of the optimization goals above to generate recruiter-ready variations.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};
