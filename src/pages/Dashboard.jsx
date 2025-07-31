import React, { useState, useEffect, Fragment } from 'react';
import {
  Brain,
  Play,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  LogOut,
  Home,
  FileText,
  CheckSquare,
  Briefcase,
  User,
  Code,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Bell,
  UserCircle,

} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Legend
} from "recharts";

const data = [
  { name: "Jan", interviews: 10, avgScore: 70 },
  { name: "Feb", interviews: 15, avgScore: 75 },
  { name: "Mar", interviews: 8, avgScore: 65 },
  { name: "Apr", interviews: 12, avgScore: 72 },
];

const userName = "John Doe";

// Simple dropdown component without headlessui
const ProfileDropdown = ({ onLogout, onProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-2 py-1 rounded-full focus:outline-none"
      >
        <UserCircle className="w-7 h-7 text-gray-600 dark:text-gray-300" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={() => {
                onProfile();
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <UserCircle className="w-4 h-4 mr-2" />
              Profile
            </button>

            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  // Initialize theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const menuItems = [
    { icon: User, label: 'Profile', id: 'Profile', action: () => setActiveItem('Profile') },
    { icon: Home, label: 'Dashboard', id: 'Dashboard', action: () => setActiveItem('Dashboard') },
    { icon: FileText, label: 'Resume Builder', id: 'Resume Builder', action: () => setActiveItem('Resume Builder') },
    { icon: CheckSquare, label: 'Resume ATS Score', id: 'ATS Score', action: () => setActiveItem('ATS Score') },
    { icon: Briefcase, label: 'Jobs', id: 'Jobs', action: () => setActiveItem('Jobs') },
    { icon: User, label: 'Jobs Based on User', id: 'User Jobs', action: () => setActiveItem('User Jobs') },
    { icon: Code, label: 'Coding', id: 'Coding', action: () => setActiveItem('Coding') },

    { icon: Code, label: 'Interview Practice', id: 'Interview Practice', action: () => setActiveItem('Interview Practice') },

    // { icon: Code, label: 'Interview Practise', id: 'Interview Practise', action: () => navigate('/interview') },

    { icon: Brain, label: 'Aptitude Questions', id: 'Aptitude', action: () => setActiveItem('Aptitude') },
    { icon: MessageSquare, label: 'Interview Experience', id: 'Interview', action: () => setActiveItem('Interview') },
  ];

  const bottomItems = [
    {
      icon: LogOut,
      label: 'Logout',
      id: 'Logout',
      action: () => {
        // Remove localStorage usage for Claude.ai compatibility
        alert('Logout functionality would be implemented here');
      }
    },
    { icon: Settings, label: 'Settings', id: 'Settings', action: () => setActiveItem('Settings') },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      // localStorage.setItem('theme', 'dark'); // Removed for Claude.ai compatibility
    } else {
      document.documentElement.classList.remove('dark');
      // localStorage.setItem('theme', 'light'); // Removed for Claude.ai compatibility
    }
  };

  const handleMenuClick = (item) => {
    setActiveItem(item.id);
    if (item.action) {
      item.action();
    }
  };

  const handleLogout = () => {
    // Remove localStorage usage for Claude.ai compatibility
    alert('Logout functionality would be implemented here');
  };

  const handleProfile = () => {
    setActiveItem('Profile');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out z-30 ${isExpanded ? 'w-64' : 'w-16'}`}>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {isExpanded && (
            <div className="flex items-center space-x-2">
              <div>
                <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                Placify
              </span>
            </div>
          )}

          {!isExpanded && (
            <div className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto">
              <Brain className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-md transition-colors duration-200"
        >
          {isExpanded ? (
            <ChevronLeft size={14} className="text-gray-600 dark:text-gray-300" />
          ) : (
            <ChevronRight size={14} className="text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Search */}
        {isExpanded && (
          <div className="p-4">
            <div className="relative bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border-none outline-none"
              />
              <div className="absolute left-3 top-2.5">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <Icon size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'} transition-all duration-200`} />
                {isExpanded && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
                {!isExpanded && (
                  <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-2 space-y-1">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
          >
            {isDarkMode ? (
              <Sun size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'} transition-all duration-200`} />
            ) : (
              <Moon size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'} transition-all duration-200`} />
            )}
            {isExpanded && (
              <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            )}
            {!isExpanded && (
              <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </div>
            )}
          </button>

          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className="w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
              >
                <Icon size={20} className={`${isExpanded ? 'mr-3' : 'mx-auto'} transition-all duration-200`} />
                {isExpanded && (
                  <span className="font-medium">{item.label}</span>
                )}
                {!isExpanded && (
                  <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {activeItem}
                </h1>
              </div>

              <div className='flex items-center space-x-2'>
                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <Bell size={20} className="text-gray-600 dark:text-gray-300" />
                </button>
                <ProfileDropdown onLogout={handleLogout} onProfile={handleProfile} />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content - Only show when Dashboard is active */}
        {activeItem === 'Dashboard' && (
          <main className="p-6">
            {/* Welcome Message */}
            <div className="text-center py-8">
              <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                Welcome back, <span className="text-blue-600 dark:text-blue-400">{userName}</span> 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400">Here's a quick summary of your performance</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Total Interviews</h2>
                <p className="text-3xl mt-2 text-blue-600 dark:text-blue-400">45</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Average Score</h2>
                <p className="text-3xl mt-2 text-green-600 dark:text-green-400">78%</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Completion Rate</h2>
                <p className="text-3xl mt-2 text-purple-600 dark:text-purple-400">92%</p>
              </div>
            </div>

            {/* Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Monthly Interviews</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
                    <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                        borderRadius: '8px',
                        color: isDarkMode ? '#F9FAFB' : '#111827'
                      }}
                    />
                    <Bar dataKey="interviews" fill="#7c3aed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Average Score</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={data}>
                    <XAxis dataKey="name" stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
                    <YAxis stroke={isDarkMode ? "#9CA3AF" : "#6B7280"} />
                    <CartesianGrid stroke={isDarkMode ? "#4B5563" : "#E5E7EB"} strokeDasharray="3 3" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#374151' : '#ffffff',
                        border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
                        borderRadius: '8px',
                        color: isDarkMode ? '#F9FAFB' : '#111827'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="avgScore" stroke="#facc15" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </main>
        )}

        {/* Other Content Sections */}
        {activeItem !== 'Dashboard' && (
          <main className="p-6">
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Current Section: {activeItem}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Content for {activeItem} section would be displayed here. This is where you can add specific components for each menu item.
              </p>

              {/* Specific content for each section */}
              {activeItem === 'Resume Builder' && (
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400">Resume builder tools and templates will be displayed here.</p>
                </div>
              )}

              {activeItem === 'Jobs' && (
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400">Job listings and search functionality will be displayed here.</p>
                </div>
              )}

              {activeItem === 'Coding' && (
                <div className="mt-4">
                  <p className="text-gray-600 dark:text-gray-400">Coding challenges and practice problems will be displayed here.</p>
                </div>
              )}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}