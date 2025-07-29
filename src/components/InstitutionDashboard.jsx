import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircle } from 'lucide-react';
import { Fragment } from 'react';
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Building2, 
  Eye, 
  ChevronRight,
  Calendar,
  Award,
  Target,
  UserCheck,
  Settings,
  LogOut,
  BarChart3,
  PieChart,
  Filter
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
// Mock data for the dashboard
const mockData = {
  institution: {
    name: "MIT College of Engineering",
    totalStudents: 1247,
    placedStudents: 892,
    placementRate: 71.5,
    averagePackage: 8.5,
    topPackage: 45,
    companiesVisited: 156
  },
  placementSummary: {
    totalInterviews: 2834,
    successfulPlacements: 892,
    pendingResults: 143,
    averageRating: 4.2
  },
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
                  onClick={() =>{
                    localStorage.removeItem("token"); 
                    navigate('/')}}
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

const StatCard = ({ icon: Icon, title, value, subtitle, color = "purple", trend }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/30 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>
      {trend && (
        <div className="flex items-center space-x-1 text-green-600">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">{trend}</span>
        </div>
      )}
    </div>
  </div>
);




const InstitutionDashboard = () => {

  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 ml-2">Placify</span>
              </div>
            </div>
            <div className='flex items-center space-x-2'>
              <ThemeToggle />
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, {mockData.institution.name}!</h1>
                <p className="text-purple-100 text-lg">
                  Your placement overview for the academic year 2023-24
                </p>
              </div>
              <div className="hidden md:block">
                <Building2 className="w-16 h-16 text-purple-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            title="Total Students"
            value={mockData.institution.totalStudents.toLocaleString()}
            subtitle="Registered students"
            color="blue"
          />
          <StatCard
            icon={UserCheck}
            title="Students Placed"
            value={mockData.institution.placedStudents.toLocaleString()}
            subtitle={`${mockData.institution.placementRate}% placement rate`}
            color="green"
            trend="+12%"
          />
          <StatCard
            icon={Target}
            title="Average Package"
            value={`₹${mockData.institution.averagePackage}L`}
            subtitle="Per annum"
            color="purple"
            trend="+8%"
          />
          <StatCard
            icon={Award}
            title="Highest Package"
            value={`₹${mockData.institution.topPackage}L`}
            subtitle="This year"
            color="orange"
          />
        </div>




        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-left hover:shadow-md transition-shadow group">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">View Detailed Performance</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Analyze student performance metrics</p>
              </div>
            </div>
          </button>
          
          <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-left hover:shadow-md transition-shadow group">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                <PieChart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Generate Reports</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Download placement analytics</p>
              </div>
            </div>
          </button>
          
          <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 text-left hover:shadow-md transition-shadow group">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                <Settings className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Manage Settings</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configure dashboard preferences</p>
              </div>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
};

export default InstitutionDashboard;