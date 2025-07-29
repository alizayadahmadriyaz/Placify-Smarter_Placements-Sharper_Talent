// 📁 EmployeeDashboard.jsx (Sidebar Version)
import React, { useState } from 'react';
import {
  Brain, TrendingUp, Building2, Calendar, Award, Target, Sun, Moon, User,
  Settings, LogOut, BarChart3, Clock, CheckCircle, Trophy, Briefcase,
  Star, Activity, Users, ChevronRight, MapPin, Mail, Phone, Edit
} from 'lucide-react';

const employeeData = {
  employee: {
    name: "Rahul Sharma",
    employeeId: "EMP001",
    email: "rahul.sharma@techcorp.com",
    phone: "+91 9876543210",
    department: "Software Engineering",
    position: "Senior Software Engineer",
    joinDate: "2022-03-15",
    location: "Bangalore, India",
    manager: "Priya Patel",
    avatar: "RS"
  },
  company: {
    name: "TechCorp Solutions",
    industry: "Information Technology",
    size: "500-1000 employees"
  },
  performance: {
    overallRating: 4.5,
    currentQuarter: {
      tasksCompleted: 42,
      projectsDelivered: 8,
      efficiency: 94,
      teamCollaboration: 4.8
    },
    goals: {
      completed: 7,
      inProgress: 3,
      upcoming: 2
    }
  },
  workHistory: [
    {
      id: 1,
      position: "Senior Software Engineer",
      department: "Software Engineering",
      startDate: "2023-06-01",
      endDate: "Present",
      manager: "Priya Patel",
      achievements: ["Led team of 5 developers", "Delivered 3 major projects", "95% code review approval"],
      current: true
    },
    {
      id: 2,
      position: "Software Engineer",
      department: "Software Engineering",
      startDate: "2022-03-15",
      endDate: "2023-05-31",
      manager: "Amit Kumar",
      achievements: ["Completed React certification", "Reduced bug reports by 40%", "Mentored 2 junior developers"],
      current: false
    }
  ],
  skills: [
    { name: "React.js", level: 95, category: "Frontend" },
    { name: "Node.js", level: 88, category: "Backend" },
    { name: "Python", level: 82, category: "Backend" },
    { name: "AWS", level: 76, category: "Cloud" },
    { name: "Leadership", level: 90, category: "Soft Skills" }
  ]
};

const StatCard = ({ icon: Icon, title, value, subtitle, color = "green", trend }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border-t-4 border-${color}-500 p-5 hover:scale-[1.02] transition-transform`}>
    <div className="flex justify-between items-center">
      <div className="space-y-1">
        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">{title}</h4>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>
      <div className={`p-2 bg-${color}-100 dark:bg-${color}-900/20 rounded-full`}>
        <Icon className={`w-5 h-5 text-${color}-600 dark:text-${color}-300`} />
      </div>
    </div>
    {trend && (
      <div className="mt-2 flex items-center text-green-600 dark:text-green-400 text-xs font-medium">
        <TrendingUp className="w-3 h-3 mr-1" /> {trend}
      </div>
    )}
  </div>
);

const SkillBar = ({ skill }) => (
  <div className="mb-5">
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-gray-800 dark:text-white">{skill.name}</span>
      <span className="text-gray-500 dark:text-gray-300">{skill.level}%</span>
    </div>
    <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
        style={{ width: `${skill.level}%` }}
      ></div>
    </div>
  </div>
);

const WorkCard = ({ job }) => (
  <div className="p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{job.position}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-300">{job.department} • {job.manager}</p>
    <p className="text-xs text-gray-400 mt-1">{job.startDate} to {job.endDate}</p>
    <ul className="list-disc pl-5 mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-1">
      {job.achievements.map((a, i) => <li key={i}>{a}</li>)}
    </ul>
  </div>
);

const EmployeeDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md px-4 py-6">
        <div className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center mb-10">
          <Brain className="w-6 h-6 mr-2" /> Placify
        </div>
        <nav className="space-y-3">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'skills', label: 'Skills', icon: Award },
            { id: 'history', label: 'Work History', icon: Clock },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedTab === tab.id ? 'bg-green-600 text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/20'}`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header Info */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 mb-10">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center text-3xl font-bold text-green-700 dark:text-green-300">
              {employeeData.employee.avatar}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{employeeData.employee.name}</h1>
              <p className="text-green-700 dark:text-green-300">{employeeData.employee.position}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{employeeData.employee.location} • Joined {employeeData.employee.joinDate}</p>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={CheckCircle} title="Tasks Completed" value={employeeData.performance.currentQuarter.tasksCompleted} subtitle="Q2 2024" trend="+12%" color="green" />
            <StatCard icon={Briefcase} title="Projects Delivered" value={employeeData.performance.currentQuarter.projectsDelivered} subtitle="Q2 2024" trend="+20%" color="blue" />
            <StatCard icon={Activity} title="Efficiency" value={`${employeeData.performance.currentQuarter.efficiency}%`} subtitle="Compared to avg" color="purple" />
            <StatCard icon={Star} title="Rating" value={employeeData.performance.overallRating} subtitle="Out of 5.0" color="yellow" />
          </div>
        )}

        {selectedTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Technical Skills</h3>
              {employeeData.skills.filter(s => s.category !== 'Soft Skills').map((s, i) => <SkillBar key={i} skill={s} />)}
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Soft Skills</h3>
              {employeeData.skills.filter(s => s.category === 'Soft Skills').map((s, i) => <SkillBar key={i} skill={s} />)}
            </div>
          </div>
        )}

        {selectedTab === 'history' && (
          <div className="space-y-6">
            {employeeData.workHistory.map((job) => <WorkCard key={job.id} job={job} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;