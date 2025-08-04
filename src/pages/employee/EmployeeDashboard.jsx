
import React, { useState } from 'react';
import {
  TrendingUp, Calendar, Award, Target,
  BarChart3, Clock, CheckCircle, Trophy, Briefcase,
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

const QuickActionCard = ({ icon: Icon, title, description, color = "blue" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer group`}>
    <div className="flex items-start space-x-4">
      <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/20 rounded-lg group-hover:scale-110 transition-transform`}>
        <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <div className="mt-3 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
          <span>Get Started</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  </div>
);

const RecentActivity = ({ activities }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className={`p-2 bg-${activity.color}-100 dark:bg-${activity.color}-900/20 rounded-full`}>
            <activity.icon className={`w-4 h-4 text-${activity.color}-600 dark:text-${activity.color}-400`} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EmployeeDashboard = () => {
  const recentActivities = [
    { title: "Completed React Advanced Course", time: "2 hours ago", icon: Award, color: "green" },
    { title: "Submitted Q2 Performance Review", time: "1 day ago", icon: BarChart3, color: "blue" },
    { title: "Updated Skills Profile", time: "3 days ago", icon: Target, color: "purple" },
    { title: "Attended Team Meeting", time: "1 week ago", icon: Users, color: "orange" }
  ];

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      {/* Welcome Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-3xl font-bold text-blue-700 dark:text-blue-300">
            {employeeData.employee.avatar}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome back, {employeeData.employee.name}!
            </h1>
            <p className="text-blue-600 dark:text-blue-400 font-medium text-lg">
              {employeeData.employee.position}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {employeeData.employee.location}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Joined {employeeData.employee.joinDate}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {employeeData.performance.overallRating}/5.0
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Overall Rating</p>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          icon={CheckCircle} 
          title="Tasks Completed" 
          value={employeeData.performance.currentQuarter.tasksCompleted} 
          subtitle="This Quarter" 
          trend="+12%" 
          color="green" 
        />
        <StatCard 
          icon={Briefcase} 
          title="Projects Delivered" 
          value={employeeData.performance.currentQuarter.projectsDelivered} 
          subtitle="This Quarter" 
          trend="+20%" 
          color="blue" 
        />
        <StatCard 
          icon={Activity} 
          title="Efficiency Score" 
          value={`${employeeData.performance.currentQuarter.efficiency}%`} 
          subtitle="Above Average" 
          color="purple" 
        />
        <StatCard 
          icon={Users} 
          title="Team Rating" 
          value={employeeData.performance.currentQuarter.teamCollaboration} 
          subtitle="Out of 5.0" 
          color="orange" 
        />
      </div>

      {/* Quick Actions and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <QuickActionCard
              icon={Target}
              title="Update Skills"
              description="Add new skills or update your proficiency levels"
              color="blue"
            />
            <QuickActionCard
              icon={BarChart3}
              title="View Performance"
              description="Check your performance metrics and feedback"
              color="green"
            />
            <QuickActionCard
              icon={Award}
              title="Learning Resources"
              description="Explore courses and training opportunities"
              color="purple"
            />
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Activities</h2>
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      {/* Goals Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Goal Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {employeeData.performance.goals.completed}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed Goals</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {employeeData.performance.goals.inProgress}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {employeeData.performance.goals.upcoming}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming Goals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;