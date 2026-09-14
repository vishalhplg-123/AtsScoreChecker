import React from 'react';
import { Menu, Plus, Bell, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const DashboardHeader = ({ setMobileOpen }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 h-16 flex items-center justify-between">
      {/* Mobile Toggle & Greeting */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-sm sm:text-base font-bold text-slate-900">
            Welcome back, {user?.name?.split(' ')[0] || 'Professional'} 👋
          </h1>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Targeting: <span className="font-semibold text-slate-700">{user?.targetRole || 'Full Stack Developer'}</span>
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        <Link to="/app/builder">
          <Button variant="primary" size="sm" icon={Plus}>
            <span className="hidden sm:inline">New Resume</span>
            <span className="sm:hidden">Create</span>
          </Button>
        </Link>
      </div>
    </header>
  );
};
