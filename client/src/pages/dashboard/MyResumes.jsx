import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Upload,
  Copy,
  Trash2,
  Edit3,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  FileText,
  Clock,
  MoreVertical,
} from 'lucide-react';
import { resumeService } from '../../services/resumeService';
import { uploadService } from '../../services/uploadService';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [parsedPreview, setParsedPreview] = useState(null);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const res = await resumeService.getResumes();
      setResumes(res.data || []);
    } catch (err) {
      showError('Failed to load resumes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDuplicate = async (id) => {
    try {
      const res = await resumeService.duplicateResume(id);
      showSuccess('Resume duplicated successfully!');
      fetchResumes();
    } catch (err) {
      showError('Failed to duplicate resume.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    try {
      await resumeService.deleteResume(id);
      showSuccess('Resume deleted successfully.');
      setResumes((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      showError('Failed to delete resume.');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showError('Please upload a file under 5MB.');
      return;
    }

    setUploading(true);
    try {
      const res = await uploadService.uploadResume(file);
      if (res.data) {
        setParsedPreview(res.data);
        showSuccess('Resume parsed! Please review extracted information.');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to parse resume file.');
    } finally {
      setUploading(false);
    }
  };

  const handleCreateFromParsed = async () => {
    if (!parsedPreview) return;
    try {
      const res = await resumeService.createResume(parsedPreview);
      showSuccess('New resume created from parsed document!');
      setUploadModalOpen(false);
      navigate(`/app/builder?id=${res.data._id}`);
    } catch (err) {
      showError('Failed to create resume from parsed file.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display">My Resumes</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage, duplicate, and customize your tailored resumes for different applications.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            icon={Upload}
            onClick={() => setUploadModalOpen(true)}
            className="flex-1 sm:flex-none"
          >
            Upload Resume
          </Button>
          <Link to="/app/builder" className="flex-1 sm:flex-none">
            <Button variant="primary" size="sm" icon={Plus} className="w-full">
              Create Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* Resumes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <Card
            key={resume._id}
            className="flex flex-col justify-between p-6 space-y-5 border border-slate-200/90 relative group hover:border-brand-500"
            hover
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {resume.template || 'Modern'}
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> {resume.atsScore || 88}% ATS
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">{resume.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Target: {resume.targetRole || resume.personalInfo?.jobTitle || 'General Professional'}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                Updated {new Date(resume.updatedAt).toLocaleDateString()}
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link to={`/app/builder?id=${resume._id}`} className="flex-1">
                <Button variant="primary" size="sm" icon={Edit3} className="w-full text-xs">
                  Edit Resume
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => handleDuplicate(resume._id)}
                className="p-2 text-slate-400 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Duplicate Resume"
              >
                <Copy className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(resume._id)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Delete Resume"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}

        {resumes.length === 0 && !loading && (
          <div className="col-span-full text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No Resumes Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Start by creating a fresh ATS-optimized resume or uploading an existing PDF/DOCX file.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm" icon={Upload} onClick={() => setUploadModalOpen(true)}>
                Upload Existing
              </Button>
              <Link to="/app/builder">
                <Button variant="primary" size="sm" icon={Plus}>
                  Create Blank
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Resume Upload & Parser Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => {
          setUploadModalOpen(false);
          setParsedPreview(null);
        }}
        title="Upload & Parse Existing Resume"
        subtitle="Upload your PDF or DOCX file under 5MB to extract and convert into an editable ATS template"
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          {!parsedPreview ? (
            <div className="p-8 border-2 border-dashed border-slate-200 hover:border-brand-500 rounded-2xl text-center space-y-3 bg-slate-50/50 transition-colors">
              <Upload className="w-10 h-10 text-slate-400 mx-auto" />
              <div>
                <label className="cursor-pointer font-bold text-sm text-brand-600 hover:text-brand-700">
                  <span>Choose PDF or DOCX file</span>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <p className="text-xs text-slate-400 mt-1">Maximum file size: 5MB</p>
              </div>
              {uploading && (
                <div className="flex items-center justify-center gap-2 text-xs font-semibold text-brand-600">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  Parsing text and mapping resume structures...
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Successfully extracted data from "{parsedPreview.originalFileName}"
                </span>
                <span className="font-bold">ATS Score: {parsedPreview.atsScore}%</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700 max-h-60 overflow-y-auto">
                <div className="font-bold text-sm text-slate-900">{parsedPreview.personalInfo?.fullName}</div>
                <div><span className="font-semibold">Title:</span> {parsedPreview.personalInfo?.jobTitle}</div>
                <div><span className="font-semibold">Email:</span> {parsedPreview.personalInfo?.email}</div>
                <div><span className="font-semibold">Extracted Skills:</span> {parsedPreview.skills?.[0]?.items?.join(', ')}</div>
                <div><span className="font-semibold">Experience count:</span> {parsedPreview.experience?.length} positions extracted</div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setParsedPreview(null)}
                >
                  Upload Different File
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCreateFromParsed}
                >
                  Create & Edit Resume
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
