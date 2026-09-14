import React, { useState } from 'react';
import { Download, Printer, ZoomIn, ZoomOut, Maximize2, Share2, Sparkles, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import html2pdf from 'html2pdf.js';
import { useResume } from '../../context/ResumeContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../common/Button';

export const ExportToolbar = ({ onOpenATS }) => {
  const { resume, zoom, setZoom, isSaving, lastSaved } = useResume();
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleZoom = (delta) => {
    setZoom((prev) => Math.max(60, Math.min(130, prev + delta)));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview-area');
    if (!element) return;

    setDownloading(true);
    try {
      const opt = {
        margin: 0,
        filename: `${(resume.personalInfo?.fullName || 'Resume').replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      await html2pdf().set(opt).from(element).save();

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      showSuccess('Resume PDF downloaded successfully!');
    } catch (err) {
      console.error('PDF export error:', err);
      showError('Failed to generate PDF. You can also use the Print button.');
    } finally {
      setDownloading(false);
    }
  };

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}/preview/${resume._id || 'demo'}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    showSuccess('Resume share link copied to clipboard!');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-subtle">
      {/* Left: Autosave indicator & ATS quick score */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs">
          {isSaving ? (
            <span className="flex items-center gap-1 text-brand-600 font-medium animate-pulse">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
              Saving...
            </span>
          ) : (
            <span className="text-slate-400 text-[11px]">
              {lastSaved ? `Saved ${new Date(lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Autosave on'}
            </span>
          )}
        </div>

        {resume.atsScore !== undefined && (
          <button
            type="button"
            onClick={onOpenATS}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
            title="Click to view full ATS breakdown"
          >
            <Sparkles className="w-3.5 h-3.5" />
            ATS Score: {resume.atsScore}/100
          </button>
        )}
      </div>

      {/* Right: Controls (Zoom, Print, Download, Share) */}
      <div className="flex items-center gap-2">
        {/* Zoom controls */}
        <div className="hidden sm:flex items-center bg-slate-100 rounded-xl p-1 gap-1">
          <button
            type="button"
            onClick={() => handleZoom(-10)}
            className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-semibold text-slate-600 px-1 w-10 text-center">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={() => handleZoom(10)}
            className="p-1 hover:bg-white rounded text-slate-600 hover:text-slate-900 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={copiedLink ? Check : Share2}
          onClick={handleShareLink}
        >
          {copiedLink ? 'Copied' : 'Share'}
        </Button>

        <Button
          variant="outline"
          size="sm"
          icon={Printer}
          onClick={handlePrint}
          title="Print to PDF (Native Quality)"
        >
          Print
        </Button>

        <Button
          variant="primary"
          size="sm"
          icon={Download}
          loading={downloading}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
      </div>
    </div>
  );
};
