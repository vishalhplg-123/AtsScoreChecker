import React, { useState, useEffect } from 'react';
import {
  KanbanSquare,
  Plus,
  MoreVertical,
  Building,
  MapPin,
  Calendar,
  DollarSign,
  Trash2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { jobService } from '../../services/jobService';
import { resumeService } from '../../services/resumeService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';

const COLUMNS = [
  { id: 'wishlist', label: 'Wishlist', color: 'border-slate-300 bg-slate-50/50' },
  { id: 'applied', label: 'Applied', color: 'border-blue-300 bg-blue-50/40' },
  { id: 'screening', label: 'Screening', color: 'border-amber-300 bg-amber-50/40' },
  { id: 'interview', label: 'Interview', color: 'border-purple-300 bg-purple-50/40' },
  { id: 'offer', label: 'Offer', color: 'border-emerald-300 bg-emerald-50/40' },
  { id: 'rejected', label: 'Rejected', color: 'border-rose-200 bg-rose-50/30' },
];

export const JobTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const { showSuccess, showError } = useToast();

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    salary: '',
    jobUrl: '',
    status: 'applied',
    resumeUsed: '',
    notes: '',
  });

  const fetchJobs = async () => {
    try {
      const [jobRes, resumeRes] = await Promise.all([
        jobService.getJobs(),
        resumeService.getResumes(),
      ]);
      setJobs(jobRes.data || []);
      setResumes(resumeRes.data || []);
    } catch (err) {
      showError('Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleOpenModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        company: job.company,
        position: job.position,
        location: job.location || '',
        salary: job.salary || '',
        jobUrl: job.jobUrl || '',
        status: job.status || 'applied',
        resumeUsed: job.resumeUsed?._id || job.resumeUsed || '',
        notes: job.notes || '',
      });
    } else {
      setEditingJob(null);
      setFormData({
        company: '',
        position: '',
        location: '',
        salary: '',
        jobUrl: '',
        status: 'applied',
        resumeUsed: resumes[0]?._id || '',
        notes: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.company || !formData.position) {
      showError('Please provide company name and position.');
      return;
    }

    try {
      if (editingJob) {
        await jobService.updateJob(editingJob._id, formData);
        showSuccess('Job application updated!');
      } else {
        await jobService.createJob(formData);
        showSuccess('New job application added to tracker!');
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch (err) {
      showError('Failed to save job application.');
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      await jobService.updateJob(jobId, { status: newStatus });
      setJobs((prev) =>
        prev.map((j) => (j._id === jobId ? { ...j, status: newStatus } : j))
      );
      showSuccess(`Moved to ${newStatus}!`);
    } catch (err) {
      showError('Failed to update status.');
    }
  };

  const handleDelete = async (jobId) => {
    if (!window.confirm('Delete this job entry?')) return;
    try {
      await jobService.deleteJob(jobId);
      showSuccess('Job deleted.');
      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      showError('Failed to delete.');
    }
  };

  const total = jobs.length;
  const activeCount = jobs.filter((j) => !['rejected', 'wishlist'].includes(j.status)).length;
  const interviewCount = jobs.filter((j) => ['interview', 'screening'].includes(j.status)).length;
  const offerCount = jobs.filter((j) => j.status === 'offer').length;
  const interviewRate = total > 0 ? Math.round((interviewCount / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
            <KanbanSquare className="w-7 h-7 text-brand-600" />
            Job Application Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize your opportunities and track stage progression in real-time.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => handleOpenModal()}
        >
          Add Application
        </Button>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white">
          <div className="text-xs font-semibold text-slate-400 uppercase">Total Tracked</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{total}</div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="text-xs font-semibold text-slate-400 uppercase">Active Pipeline</div>
          <div className="text-2xl font-bold text-brand-600 mt-1">{activeCount}</div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="text-xs font-semibold text-slate-400 uppercase">Interviews / Loops</div>
          <div className="text-2xl font-bold text-purple-600 mt-1">{interviewCount}</div>
        </Card>
        <Card className="p-4 bg-white">
          <div className="text-xs font-semibold text-slate-400 uppercase">Offers Received</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{offerCount}</div>
        </Card>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const colJobs = jobs.filter((j) => j.status === col.id);

          return (
            <div
              key={col.id}
              className={`rounded-2xl border p-3.5 space-y-3 min-h-[450px] flex flex-col ${col.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {col.label}
                </span>
                <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-[11px] font-bold flex items-center justify-center shadow-xs">
                  {colJobs.length}
                </span>
              </div>

              {/* Cards list */}
              <div className="space-y-2.5 flex-1">
                {colJobs.map((job) => (
                  <div
                    key={job._id}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-subtle transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="font-bold text-xs text-slate-900 line-clamp-1">{job.company}</div>
                      <button
                        type="button"
                        onClick={() => handleDelete(job._id)}
                        className="text-slate-300 hover:text-rose-500 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] font-semibold text-brand-700 line-clamp-1">
                      {job.position}
                    </div>

                    {job.location && (
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </div>
                    )}

                    {job.salary && (
                      <div className="text-[10px] text-slate-600 font-medium flex items-center gap-1">
                        <DollarSign className="w-3 h-3" /> {job.salary}
                      </div>
                    )}

                    {/* Quick Move Selector */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <select
                        value={job.status}
                        onChange={(e) => handleStatusChange(job._id, e.target.value)}
                        className="text-[10px] font-bold text-slate-600 bg-slate-50 rounded px-1.5 py-0.5 border border-slate-200"
                      >
                        {COLUMNS.map((c) => (
                          <option key={c.id} value={c.id}>
                            Move: {c.label}
                          </option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => handleOpenModal(job)}
                        className="text-[10px] text-brand-600 hover:underline font-semibold"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Job Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingJob ? 'Edit Application' : 'Add New Application'}
        subtitle="Track company requirements, interview dates, and linked resumes"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name *</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Stripe, Google"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title *</label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Remote / Hybrid"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Salary Range</label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                placeholder="e.g. $140k - $160k"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Stage Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Linked Resume</label>
              <select
                value={formData.resumeUsed}
                onChange={(e) => setFormData({ ...formData, resumeUsed: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              >
                <option value="">None</option>
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Job Post Link</label>
            <input
              type="text"
              value={formData.jobUrl}
              onChange={(e) => setFormData({ ...formData, jobUrl: e.target.value })}
              placeholder="e.g. https://careers.google.com/jobs/123"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Notes & Follow-ups</label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Recruiter contact, interview rounds, prep notes..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full">
            {editingJob ? 'Save Changes' : 'Create Entry'}
          </Button>
        </form>
      </Modal>
    </div>
  );
};
