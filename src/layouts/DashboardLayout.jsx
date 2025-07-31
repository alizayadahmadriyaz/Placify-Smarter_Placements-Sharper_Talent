// DashboardLayout.jsx
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/SideBarStudent";
import { Bell } from "lucide-react";

const DashboardLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const location = useLocation();

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    const titleMap = {
      '/dashboard/profile': 'Profile',
      '/dashboard': 'Dashboard',
      '/dashboard/resume-builder': 'Resume Builder',
      '/dashboard/resume-ats': 'Resume ATS Score',
      '/dashboard/jobs': 'Jobs',
      '/dashboard/user-jobs': 'Jobs Based on User',
      '/dashboard/coding': 'Coding',
      '/dashboard/interview-practice': 'Interview Practice',
      '/dashboard/aptitude': 'Aptitude Questions',
      '/dashboard/interview-experience': 'Interview Experience',
      '/settings': 'Settings'
    };
    return titleMap[path] || 'Dashboard';
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      {/* Fixed Sidebar - Pass state and setter to Sidebar */}
      <Sidebar 
        isExpanded={sidebarExpanded} 
        setIsExpanded={setSidebarExpanded} 
      />

      {/* Main content area */}
      <div className={`transition-all duration-300 flex-1 flex flex-col ${
        sidebarExpanded ? "ml-64" : "ml-20"
      }`}>
        {/* Top Navigation Bar */}
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
                {getPageTitle()}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Welcome back! Here's what's happening.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - This is where your page components render */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;