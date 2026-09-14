import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Wand2,
  ShieldCheck,
  Target,
  Mail,
  KanbanSquare,
  MessageSquareCode,
  Settings,
  Sparkles,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Dashboard', path: '/app', icon: LayoutDashboard, exact: true },
    { label: 'My Resumes', path: '/app/resumes', icon: FileText },
    { label: 'Create Resume', path: '/app/builder', icon: PlusCircle, highlight: true },
    { label: 'AI Wizard', path: '/app/ai-wizard', icon: Wand2 },
    { label: 'ATS Checker', path: '/app/ats-checker', icon: ShieldCheck },
    { label: 'Job Tailor', path: '/app/job-tailor', icon: Target },
    { label: 'Cover Letters', path: '/app/cover-letters', icon: Mail },
    { label: 'Job Tracker', path: '/app/job-tracker', icon: KanbanSquare },
    { label: 'Interview Prep', path: '/app/interview-prep', icon: MessageSquareCode },
    { label: 'Settings', path: '/app/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top: Logo & Main Nav */}
        <div className="flex flex-col flex-1 overflow-y-auto p-4">
          {/* Brand Logo */}
          <Link
            to="/app"
            className="flex items-center gap-2.5 px-3 py-3 mb-4 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 flex items-center justify-center text-white shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-slate-900 font-display">
                Resume<span className="text-brand-600">AI</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 -mt-1 tracking-wider uppercase">
                Pro Dashboard
              </span>
            </div>
          </Link>

          {/* Nav list */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 shadow-xs'
                      : item.highlight
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white hover:opacity-95 shadow-sm my-2'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className={`w-4 h-4 shrink-0 ${item.highlight ? 'text-white' : ''}`} />
                  <span>{item.label}</span>
                </div>
                {item.highlight && <Sparkles className="w-3.5 h-3.5 text-cyan-200" />}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom User Card */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0 border border-brand-200">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-bold text-slate-900 truncate">
                  {user?.name || 'User'}
                </span>
                <span className="text-[10px] text-slate-500 truncate">
                  {user?.email || 'user@example.com'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <div className="p-2.5 bg-gradient-to-r from-brand-50 to-indigo-50 rounded-xl border border-brand-100/80 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span className="text-[11px] font-bold text-brand-900">AI Pro Tier</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand-600 text-white font-bold">
              Active
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
