import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { Button } from '../common/Button';

export const CertificationsEditor = () => {
  const { resume, setResume } = useResume();
  const certList = resume.certifications || [];

  const addCert = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '2023',
      credentialId: '',
      url: '',
    };
    setResume((prev) => ({
      ...prev,
      certifications: [...(prev.certifications || []), newCert],
    }));
  };

  const updateCert = (idx, field, val) => {
    setResume((prev) => {
      const list = [...prev.certifications];
      list[idx] = { ...list[idx], [field]: val };
      return { ...prev, certifications: list };
    });
  };

  const removeCert = (idx) => {
    setResume((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== idx),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Add verified licenses and cloud/technical certifications.
        </p>
        <Button variant="secondary" size="sm" icon={Plus} onClick={addCert}>
          Add Certification
        </Button>
      </div>

      {certList.map((c, idx) => (
        <div
          key={c.id || idx}
          className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 grid grid-cols-1 sm:grid-cols-2 gap-3 relative"
        >
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Certification Name *</label>
            <input
              type="text"
              value={c.name || ''}
              onChange={(e) => updateCert(idx, 'name', e.target.value)}
              placeholder="e.g. AWS Solutions Architect Associate"
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Issuer / Organization *</label>
            <input
              type="text"
              value={c.issuer || ''}
              onChange={(e) => updateCert(idx, 'issuer', e.target.value)}
              placeholder="e.g. Amazon Web Services, MongoDB"
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Date Issued</label>
            <input
              type="text"
              value={c.issueDate || ''}
              onChange={(e) => updateCert(idx, 'issueDate', e.target.value)}
              placeholder="e.g. 2023"
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
            />
          </div>

          <div className="flex items-end justify-between gap-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-700 mb-1">Credential URL</label>
              <input
                type="text"
                value={c.url || ''}
                onChange={(e) => updateCert(idx, 'url', e.target.value)}
                placeholder="e.g. https://verify.com/id"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white"
              />
            </div>
            <button
              type="button"
              onClick={() => removeCert(idx)}
              className="text-slate-400 hover:text-rose-500 p-2 mb-0.5"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
