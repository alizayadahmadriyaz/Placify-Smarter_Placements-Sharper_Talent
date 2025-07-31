import React, { useState } from 'react';
import { 
  Brain, Users, TrendingUp, Building2, Eye, PieChart, Settings, 
  UserCheck, Target, Award, LogOut, UserCircle, Sun, Moon
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  CartesianGrid, BarChart, Bar, Legend
} from 'recharts';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 dark:from-gray-800 dark:to-gray-600 hover:from-blue-600 hover:to-purple-600 dark:hover:from-gray-700 dark:hover:to-gray-500 transition"
    >
      {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-white" />}
    </button>
  );
};

const ProfileDropdown = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setShowProfile(!showProfile)}
        className="inline-flex items-center p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition"
      >
        <UserCircle className="w-6 h-6 text-white" />
      </button>
      {showProfile && (
        <div className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-lg shadow-lg bg-white dark:bg-gray-900 border dark:border-gray-700">
          <div className="py-2">
            <button onClick={() => alert('Profile')} className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
              <UserCircle className="inline w-4 h-4 mr-2" /> Profile
            </button>
            <button onClick={() => alert('Logout')} className="w-full text-left px-4 py-2 text-sm hover:bg-red-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400">
              <LogOut className="inline w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, subtitle, color = "indigo", trend, delay = 0 }) => (
  <div 
    className={`rounded-2xl shadow-lg p-6 bg-gradient-to-br from-${color}-100 to-white dark:from-${color}-900/30 dark:to-gray-800 hover:scale-105 transition-transform`} 
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className={`p-3 bg-${color}-200 dark:bg-${color}-800 text-${color}-700 dark:text-${color}-300 rounded-full shadow-md`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-300">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
      </div>
      {trend && (
        <div className="text-green-600 dark:text-green-400 flex items-center gap-1 animate-bounce">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">{trend}</span>
        </div>
      )}
    </div>
  </div>
);

const InstitutionDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <header className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Institution Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <ProfileDropdown />
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          title="Total Students" 
          value="1250" 
          subtitle="Registered" 
          color="blue" 
          trend="+5%" 
        />
        <StatCard 
          icon={UserCheck} 
          title="Students Placed" 
          value="890" 
          subtitle="71.2% Placement Rate" 
          color="green" 
          trend="+12%" 
        />
        <StatCard 
          icon={Target} 
          title="Average Package" 
          value="₹12.5L" 
          subtitle="Per Annum" 
          color="purple" 
          trend="+8%" 
        />
        <StatCard 
          icon={Award} 
          title="Top Package" 
          value="₹45L" 
          subtitle="This Year" 
          color="orange" 
        />
      </section>

      <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Placement Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[{ month: 'Jan', placed: 30 }, { month: 'Feb', placed: 50 }, { month: 'Mar', placed: 40 }]}> 
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#8884d8" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="placed" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Department-wise Internship Offers</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[{ year: '2022', CSE: 82, ISE: 52 }, { year: '2023', CSE: 168, ISE: 138 }]}> 
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="CSE" fill="#3b82f6" name="CSE" />
              <Bar dataKey="ISE" fill="#f97316" name="ISE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default InstitutionDashboard;
