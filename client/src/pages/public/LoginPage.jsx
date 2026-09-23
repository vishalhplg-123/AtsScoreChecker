import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Lock, Mail, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/common/Button';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, demoLogin, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/app', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showError('Please fill in both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      showSuccess('Welcome back to ResumeAI!');
      navigate('/app');
    } catch (err) {
      showError(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await demoLogin();
      showSuccess('Logged in as Vishal Kumar (Demo Account)!');
      navigate('/app');
    } catch (err) {
      // In case DB is not pre-seeded, fallback or alert
      showError('Demo account loading. Trying automatic registration...');
      try {
        await login('vishal@example.com', 'password123');
        navigate('/app');
      } catch (e) {
        showError('Could not login demo account. Please register a quick account.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-premium">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 flex items-center justify-center text-white shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
          </Link>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">
            Sign in to ResumeAI
          </h2>
          <p className="text-xs text-slate-500">
            Build and optimize resumes that pass recruiter ATS screenings.
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div className="p-4 bg-gradient-to-r from-brand-50 via-indigo-50 to-cyan-50 rounded-2xl border border-brand-200/80 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand-900">
              <UserCheck className="w-4 h-4 text-brand-600" />
              <span>Instant Recruiter / Demo Access</span>
            </div>
            <span className="text-[10px] bg-brand-600 text-white font-bold px-1.5 py-0.5 rounded">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-slate-600">
            Explore with pre-populated resumes, job applications, and ATS scores for <span className="font-semibold text-slate-900">Vishal Kumar (MERN Developer)</span>.
          </p>
          <Button
            type="button"
            variant="ai"
            size="sm"
            loading={loading}
            onClick={handleDemoLogin}
            className="w-full text-xs py-2"
          >
            1-Click Demo Login
          </Button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 absolute">
            Or continue with email
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 bg-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 bg-white"
                required
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            Sign In
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-brand-600 hover:text-brand-700">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
