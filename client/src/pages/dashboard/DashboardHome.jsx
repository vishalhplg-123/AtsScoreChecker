import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  ShieldCheck,
  Briefcase,
  Users,
  PlusCircle,
  Wand2,
  Target,
  Mail,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Calendar,
  Clock,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { resumeService } from '../../services/resumeService';
import { jobService } from '../../services/jobService';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const DashboardHome = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({
    totalResumes: 0,
    avgAtsScore: 0,
    applications: 0,
    interviews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [resumesRes, jobsRes] = await Promise.all([
          resumeService.getResumes(),
          jobService.getJobs(),
        ]);

        const resumeList = resumesRes.data || [];
        const jobList = jobsRes.data || [];
        setResumes(resumeList);
        setJobs(jobList);

        const totalScore = resumeList.reduce((acc, r) => acc + (r.atsScore || 0), 0);
        const avgScore = resumeList.length > 0 ? Math.round(totalScore / resumeList.length) : 85;

        setStats({
          totalResumes: resumeList.length,
          avgAtsScore: avgScore,
          applications: jobList.length,
          interviews: jobList.filter((j) => ['interview', 'screening'].includes(j.status)).length,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-700 via-indigo-700 to-cyan-700 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            AI Career Suite Pro
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Supercharge Your Job Search
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Create ATS-compliant resumes, tailor bullet points to job descriptions, and prepare for interviews with AI feedback.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <Link to="/app/ai-wizard">
            <Button variant="secondary" size="md" icon={Wand2} className="bg-white text-brand-900 hover:bg-slate-100 shadow-md">
              AI Resume Wizard
            </Button>
          </Link>
          <Link to="/app/builder">
            <Button variant="primary" size="md" icon={PlusCircle} className="bg-brand-900 hover:bg-brand-950 text-white border border-white/20">
              New Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="flex items-center gap-4 p-5" hover>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{stats.totalResumes}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Resumes</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5" hover>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{stats.avgAtsScore}%</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg ATS Score</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5" hover>
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{stats.applications}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Applications</div>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-5" hover>
          <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900">{stats.interviews}</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Interviews Active</div>
          </div>
        </Card>
      </div>

      {/* 3. Quick Actions */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Quick Tools</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/app/ats-checker"
            className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-subtle transition-all flex flex-col items-start gap-2 group"
          >
            <ShieldCheck className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">Check ATS Score</div>
              <div className="text-[10.5px] text-slate-500">Analyze against JD</div>
            </div>
          </Link>

          <Link
            to="/app/job-tailor"
            className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-subtle transition-all flex flex-col items-start gap-2 group"
          >
            <Target className="w-5 h-5 text-brand-600 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">Tailor Resume</div>
              <div className="text-[10.5px] text-slate-500">Target specific roles</div>
            </div>
          </Link>

          <Link
            to="/app/cover-letters"
            className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-subtle transition-all flex flex-col items-start gap-2 group"
          >
            <Mail className="w-5 h-5 text-violet-600 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">Cover Letter</div>
              <div className="text-[10.5px] text-slate-500">AI tailored letters</div>
            </div>
          </Link>

          <Link
            to="/app/interview-prep"
            className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-500 hover:shadow-subtle transition-all flex flex-col items-start gap-2 group"
          >
            <Sparkles className="w-5 h-5 text-cyan-600 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-slate-900">Interview Prep</div>
              <div className="text-[10.5px] text-slate-500">Mock Q&A with scoring</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. Recent Resumes and Recent Applications Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Resumes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-600" />
              Recent Resumes
            </h3>
            <Link to="/app/resumes" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {resumes.slice(0, 3).map((r) => (
              <Card key={r._id} className="p-4 flex items-center justify-between" hover>
                <div className="space-y-1 truncate pr-4">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{r.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="capitalize">{r.template || 'Modern'} Template</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">ATS: {r.atsScore || 90}%</span>
                  </div>
                </div>

                <Link to={`/app/builder?id=${r._id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
              </Card>
            ))}

            {resumes.length === 0 && !loading && (
              <div className="text-center py-8 bg-white rounded-2xl border border-slate-200">
                <p className="text-xs text-slate-500 mb-3">No resumes created yet.</p>
                <Link to="/app/builder">
                  <Button variant="primary" size="sm" icon={PlusCircle}>
                    Create First Resume
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Job Applications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-brand-600" />
              Active Job Pipeline
            </h3>
            <Link to="/app/job-tracker" className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
              Open Kanban <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {jobs.slice(0, 3).map((job) => (
              <Card key={job._id} className="p-4 flex items-center justify-between" hover>
                <div className="space-y-1 truncate pr-4">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">{job.company}</h4>
                    <Badge
                      variant={
                        job.status === 'offer'
                          ? 'success'
                          : job.status === 'interview'
                          ? 'brand'
                          : job.status === 'screening'
                          ? 'warning'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {job.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {job.position} {job.location ? `• ${job.location}` : ''}
                  </div>
                </div>

                <Link to="/app/job-tracker">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </Link>
              </Card>
            ))}

            {jobs.length === 0 && !loading && (
              <div className="text-center py-8 bg-white rounded-2xl border border-slate-200">
                <p className="text-xs text-slate-500 mb-3">No jobs in your tracker pipeline.</p>
                <Link to="/app/job-tracker">
                  <Button variant="outline" size="sm">
                    Add First Application
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
