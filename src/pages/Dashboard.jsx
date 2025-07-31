import React, { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Menu as MenuIcon
} from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
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

// Theme Toggle Component
const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600" />
      )}
    </button>
  );
};

const ProfileDropdown = () => {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center px-2 py-1 rounded-full focus:outline-none">
          <UserCircle className="w-7 h-7 text-gray-600 dark:text-gray-300" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => navigate('/profile')}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200`}
                >
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    localStorage.removeItem("token"); 
                    navigate('/')
                  }}
                  className={`${
                    active ? 'bg-gray-100 dark:bg-gray-700' : ''
                  } flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200`}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { icon: User, label: 'Profile', id: 'Profile', action: () => navigate('/profile') },
    { icon: Home, label: 'Dashboard', id: 'Dashboard', action: () => setActiveItem('Dashboard') },
    { icon: FileText, label: 'Resume Builder', id: 'Resume Builder', action: () => setActiveItem('Resume Builder') },
    { icon: CheckSquare, label: 'Resume ATS Score', id: 'ATS Score', action: () => setActiveItem('ATS Score') },
    { icon: Briefcase, label: 'Jobs', id: 'Jobs', action: () => setActiveItem('Jobs') },
    { icon: User, label: 'Jobs Based on User', id: 'User Jobs', action: () => setActiveItem('User Jobs') },
    { icon: Code, label: 'Coding', id: 'Coding', action: () => setActiveItem('Coding') },
    { icon: Brain, label: 'Aptitude Questions', id: 'Aptitude', action: () => setActiveItem('Aptitude') },
    { icon: MessageSquare, label: 'Interview Experience', id: 'Interview', action: () => setActiveItem('Interview') },
  ];

  const bottomItems = [
    { 
      icon: LogOut, 
      label: 'Logout', 
      id: 'Logout', 
      action: () => {
        localStorage.removeItem("token"); 
        navigate('/');
      }
    },
    { icon: Settings, label: 'Settings', id: 'Settings', action: () => setActiveItem('Settings') },
  ];

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add your theme toggle logic here
    document.documentElement.classList.toggle('dark');
  };

  const handleMenuClick = (item) => {
    setActiveItem(item.id);
    if (item.action) {
      item.action();
    }
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gray-50 text-gray-800';

  const sidebarTheme = isDarkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-300`}>
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full ${sidebarTheme} border-r transition-all duration-300 ease-in-out z-30 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {isExpanded && (
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </motion.div>
              
              <motion.span 
                className="text-xl font-bold text-gray-900 dark:text-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Placify
              </motion.span>
            </motion.div>
          )}
          
          {!isExpanded && (
            <motion.div
              className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Brain className="w-8 h-8" />
            </motion.div>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`absolute -right-3 top-6 w-6 h-6 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} rounded-full flex items-center justify-center shadow-md transition-colors duration-200`}
        >
          {isExpanded ? (
            <ChevronLeft size={14} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
          ) : (
            <ChevronRight size={14} className={isDarkMode ? 'text-gray-300' : 'text-gray-600'} />
          )}
        </button>

        {/* Search */}
        {isExpanded && (
          <div className="p-4">
            <div className={`relative ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <input
                type="text"
                placeholder="Search..."
                className={`w-full pl-10 pr-4 py-2 ${isDarkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-50 text-gray-800 placeholder-gray-500'} rounded-lg border-none outline-none`}
              />
              <div className="absolute left-3 top-2.5">
                <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
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
            className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              isDarkMode
                ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }`}
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
                className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
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
        <motion.header 
          className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {activeItem}
                </h1>
              </motion.div>
              
              <motion.div 
                className='flex items-center space-x-2'
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}>
                  <Bell size={20} />
                </button>
                <ProfileDropdown />
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content - Only show when Dashboard is active */}
        {activeItem === 'Dashboard' && (
          <main className="p-6">
            {/* Welcome Message */}
            <div className="text-center py-8">
              <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                Welcome back, <span className="text-blue-600">{userName}</span> 👋
              </h1>
              <p className="text-gray-400">Here's a quick summary of your performance</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Total Interviews</h2>
                <p className="text-3xl mt-2 text-blue-600 dark:text-blue-400">45</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Average Score</h2>
                <p className="text-3xl mt-2 text-green-600 dark:text-green-400">78%</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Completion Rate</h2>
                <p className="text-3xl mt-2 text-purple-600 dark:text-purple-400">92%</p>
              </div>
            </div>

            {/* Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Monthly Interviews</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis stroke="#ccc" />
                    <Tooltip />
                    <Bar dataKey="interviews" fill="#7c3aed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Average Score</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis stroke="#ccc" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <Tooltip />
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
            <div className={`mt-8 p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-sm border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className="text-xl font-semibold mb-4">Current Section: {activeItem}</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Content for {activeItem} section would be displayed here. This is where you can add specific components for each menu item.
              </p>
              
              {/* You can add specific content for each section here */}
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