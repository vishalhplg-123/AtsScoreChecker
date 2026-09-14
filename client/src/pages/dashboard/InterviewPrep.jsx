import React, { useState } from 'react';
import {
  MessageSquareCode,
  Sparkles,
  Send,
  Star,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
} from 'lucide-react';
import { aiService } from '../../services/aiService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const InterviewPrep = () => {
  const [role, setRole] = useState('Senior Full Stack Developer');
  const [company, setCompany] = useState('Google / Amazon');
  const [experience, setExperience] = useState('4+ Years');
  const [skills, setSkills] = useState('React.js, Node.js, MongoDB, Distributed Systems, Redis');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const { showSuccess, showError } = useToast();

  const handleGenerateQuestions = async () => {
    setLoading(true);
    setEvaluation(null);
    setUserAnswer('');
    try {
      const res = await aiService.getInterviewPrep({
        role,
        company,
        experience,
        skills,
        jobDescription,
      });

      if (res.data?.questions) {
        setQuestions(res.data.questions);
        setActiveQuestion(res.data.questions[0]);
        showSuccess('Interview questions generated!');
      }
    } catch (err) {
      showError('Failed to generate interview questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluateAnswer = async () => {
    if (!userAnswer || userAnswer.trim().length < 15) {
      showError('Please type a more comprehensive answer before evaluating.');
      return;
    }

    setEvaluating(true);
    try {
      const res = await aiService.evaluateAnswer({
        question: activeQuestion.question,
        answer: userAnswer,
        role,
      });

      if (res.data) {
        setEvaluation(res.data);
        showSuccess('AI Feedback ready!');
      }
    } catch (err) {
      showError('Failed to evaluate answer.');
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
          <MessageSquareCode className="w-7 h-7 text-cyan-600" />
          AI Mock Interview Preparation & Coach
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Practice realistic technical, behavioral (STAR method), and system design questions tailored to your exact target position.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Role *</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Google, Meta"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Experience</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 3 Years"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Key Tech Skills</label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="React, Node.js, MongoDB, Docker"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <Button
              variant="ai"
              size="lg"
              icon={Sparkles}
              loading={loading}
              onClick={handleGenerateQuestions}
              className="w-full"
            >
              Generate Questions
            </Button>
          </Card>

          {/* Questions Sidebar List */}
          {questions.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Generated Questions ({questions.length})
              </span>
              {questions.map((q, idx) => (
                <div
                  key={q.id || idx}
                  onClick={() => {
                    setActiveQuestion(q);
                    setEvaluation(null);
                    setUserAnswer('');
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    activeQuestion?.id === q.id
                      ? 'border-brand-600 bg-brand-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">{q.category}</span>
                    <Badge variant="neutral" size="sm">
                      {q.difficulty}
                    </Badge>
                  </div>
                  <p className="text-slate-600 line-clamp-2">{q.question}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Active Question & Answer Arena (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeQuestion ? (
            <div className="space-y-4">
              {/* Question Card */}
              <Card className="p-6 space-y-3 bg-white border-brand-200">
                <div className="flex items-center justify-between">
                  <Badge variant="brand" size="md">
                    {activeQuestion.category}
                  </Badge>
                  <span className="text-xs text-slate-400">Targeting {company}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-relaxed">
                  {activeQuestion.question}
                </h3>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800">Interviewer Expectations:</div>
                  <p>{activeQuestion.whatInterviewerLooksFor}</p>
                </div>
              </Card>

              {/* User Answer Textarea */}
              <Card className="p-5 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Your Answer (Practice typing your response)
                </label>
                <textarea
                  rows={6}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Explain your technical reasoning or structure your answer using STAR (Situation, Task, Action, Result)..."
                  className="w-full p-3.5 text-xs rounded-xl border border-slate-200 bg-white leading-relaxed"
                />

                <div className="flex justify-end">
                  <Button
                    variant="ai"
                    size="md"
                    icon={Send}
                    loading={evaluating}
                    onClick={handleEvaluateAnswer}
                  >
                    Evaluate My Answer
                  </Button>
                </div>
              </Card>

              {/* AI Evaluation Box */}
              {evaluation && (
                <Card className="p-6 space-y-4 bg-gradient-to-br from-indigo-50/50 via-white to-brand-50/40 border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                        Answer Score
                      </span>
                      <div className="text-3xl font-black text-slate-900 font-display">
                        {evaluation.score} <span className="text-sm font-normal text-slate-400">/ 10</span>
                      </div>
                    </div>
                    <Badge variant={evaluation.score >= 7 ? 'success' : 'warning'} size="lg">
                      {evaluation.rating}
                    </Badge>
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1">
                      <div className="font-bold text-emerald-900 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Strengths
                      </div>
                      <ul className="space-y-0.5 text-emerald-800">
                        {evaluation.strengths?.map((s, i) => (
                          <li key={i}>• {s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1">
                      <div className="font-bold text-amber-900 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Opportunities
                      </div>
                      <ul className="space-y-0.5 text-amber-800">
                        {evaluation.improvements?.map((imp, i) => (
                          <li key={i}>• {imp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {evaluation.suggestedRevision && (
                    <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs space-y-1 shadow-xs">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                        Model Upgraded Answer
                      </div>
                      <p className="text-slate-700 leading-relaxed italic">
                        "{evaluation.suggestedRevision}"
                      </p>
                    </div>
                  )}
                </Card>
              )}
            </div>
          ) : (
            <Card className="p-12 text-center space-y-3 flex flex-col items-center justify-center min-h-[350px]">
              <MessageSquareCode className="w-12 h-12 text-slate-300" />
              <h3 className="text-sm font-bold text-slate-700">No Questions Generated</h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Enter your target role on the left and click "Generate Questions" to begin interactive mock interview prep.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
