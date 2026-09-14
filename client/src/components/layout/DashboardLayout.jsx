import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { DashboardHeader } from './DashboardHeader';
import { useAuth } from '../../context/AuthContext';
import { ResumeProvider } from '../../context/ResumeContext';

export const DashboardLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-600">Loading ResumeAI Workspace...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <ResumeProvider>
      <div className="min-h-screen bg-slate-50/70 flex flex-col md:flex-row">
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader setMobileOpen={setMobileOpen} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ResumeProvider>
  );
};
