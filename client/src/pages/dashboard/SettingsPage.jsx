import React, { useState } from 'react';
import { User, Settings, Save, Shield, Bell, Key } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';

export const SettingsPage = () => {
  const { user, updateProfile } = useAuth();
  const { showSuccess, showError } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [headline, setHeadline] = useState(user?.headline || '');
  const [targetRole, setTargetRole] = useState(user?.targetRole || '');
  const [defaultTemplate, setDefaultTemplate] = useState(user?.preferences?.defaultTemplate || 'modern');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({
        name,
        headline,
        targetRole,
        preferences: {
          defaultTemplate,
        },
      });
      showSuccess('Profile settings updated successfully!');
    } catch (err) {
      showError('Failed to update settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
          <Settings className="w-7 h-7 text-slate-700" />
          Account & Preferences
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal profile, target career preferences, and default resume settings.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">
            Profile Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email (Read Only)</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Professional Headline</label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Senior MERN Stack & AI Developer"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Primary Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer"
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 bg-white"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">
            Resume Preferences
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Default Resume Template
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['classic', 'modern', 'minimal', 'developer', 'professional', 'executive'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDefaultTemplate(t)}
                  className={`p-3 rounded-xl border text-xs font-bold capitalize text-left transition-all ${
                    defaultTemplate === t
                      ? 'border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-500'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="lg" icon={Save} loading={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
