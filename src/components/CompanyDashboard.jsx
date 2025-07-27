import React, { useState } from 'react';
import { 
  Users, Building2, TrendingUp, Award, Search, Filter, Eye, MoreHorizontal, 
  Brain, Sun, Moon, User, Settings, LogOut, Bell, ChevronDown, Target,
  Clock, MapPin, Mail, Phone, Calendar, Download, Plus, Edit
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Menu, Transition } from '@headlessui/react';
import { UserCircle } from 'lucide-react';
import { Fragment } from 'react';
// Mock data for company
const companyData = {
  name: "TechCorp Solutions",
  logo: "TC",
  totalEmployees: 450,
  departments: 8,
  avgPerformance: 8.2,
  topPerformers: 23,
  growthRate: 12.5,
  employees: [
    { 
      id: 1, 
      name: "Sarah Chen", 
      role: "Senior Software Engineer", 
      department: "Engineering", 
      performance: 8.7, 
      experience: "3.5 years",
      email: "sarah.chen@techcorp.com",
      joinDate: "2021-06-15",
      status: "Active"
    },
    { 
      id: 2, 
      name: "John Smith", 
      role: "Product Manager", 
      department: "Product", 
      performance: 9.1, 
      experience: "5 years",
      email: "john.smith@techcorp.com",
      joinDate: "2020-03-10",
      status: "Active"
    },
    { 
      id: 3, 
      name: "Lisa Wang", 
      role: "UX Designer", 
      department: "Design", 
      performance: 8.9, 
      experience: "4 years",
      email: "lisa.wang@techcorp.com",
      joinDate: "2021-01-20",
      status: "Active"
    },
    { 
      id: 4, 
      name: "Mark Johnson", 
      role: "DevOps Engineer", 
      department: "Engineering", 
      performance: 8.3, 
      experience: "2.5 years",
      email: "mark.johnson@techcorp.com",
      joinDate: "2022-08-12",
      status: "Active"
    },
    { 
      id: 5, 
      name: "Emily Davis", 
      role: "Data Scientist", 
      department: "Analytics", 
      performance: 9.0, 
      experience: "3 years",
      email: "emily.davis@techcorp.com",
      joinDate: "2022-02-28",
      status: "Active"
    }
  ],
  departmentStats: [
    { name: "Engineering", count: 180, percentage: 40 },
    { name: "Product", count: 90, percentage: 20 },
    { name: "Design", count: 45, percentage: 10 },
    { name: "Sales", count: 68, percentage: 15 },
    { name: "Analytics", count: 36, percentage: 8 },
    { name: "Others", count: 31, percentage: 7 }
  ],
  recentHires: [
    { name: "Alex Rodriguez", role: "Frontend Developer", department: "Engineering", date: "2025-01-20" },
    { name: "Maya Patel", role: "Marketing Manager", department: "Marketing", date: "2025-01-18" },
    { name: "David Kim", role: "Sales Executive", department: "Sales", date: "2025-01-15" }
  ]
};



// Profile Dropdown Component
const ProfileDropdown = () => (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center px-2 py-1 rounded-full focus:outline-none">
          <UserCircle className="w-7 h-7 text-gray-600 dark:text-gray-300" />
        </Menu.Button>
      </div>

      <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
          {/* <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">johndoe@example.com</p>
          </div> */}
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button onClick={() => navigate('/profile')}
                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200`}>
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile
                </button>
              )}
            </Menu.Item>
            
            <Menu.Item>
              {({ active }) => (
                <button onClick={() => navigate('/')}
                  className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-gray-200`}>
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

// Stat Card Component
const StatCard = ({ icon: Icon, title, value, subtitle, trend, color = "orange" }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{value}</p>
        {subtitle && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{subtitle}</p>}
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500 text-sm font-medium">+{trend}%</span>
          </div>
        )}
      </div>
      <div className={`w-12 h-12 bg-${color}-100 dark:bg-${color}-900/30 rounded-xl flex items-center justify-center`}>
        <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
      </div>
    </div>
  </div>
);

// Employee Table Component
const EmployeeTable = ({ employees }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getPerformanceColor = (performance) => {
    if (performance >= 9) return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400';
    if (performance >= 8) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400';
    if (performance >= 7) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Employee Directory</h3>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Analytics">Analytics</option>
            </select>
            <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 dark:text-orange-400 font-medium text-sm">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{employee.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">
                    {employee.department}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPerformanceColor(employee.performance)}`}>
                    {employee.performance}/10
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{employee.experience}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button className="text-orange-600 dark:text-orange-400 hover:text-orange-900 dark:hover:text-orange-300">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Company Dashboard Component
const CompanyDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Animated Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div>
                <Brain className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Placify
              </span>
            </div>
            <div className='flex items-center space-x-2'>
              <ThemeToggle />
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Company Profile Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-orange-600 to-orange-600 text-white p-8 rounded-xl mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold">{companyData.logo}</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{companyData.name}</h1>
                <p className="text-orange-100 mt-1">Technology Solutions Company</p>
                <div className="flex items-center space-x-6 mt-3 text-sm">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    San Francisco, CA
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Founded 2018
                  </span>
                  <span className="flex items-center">
                    <Mail className="w-4 h-4 mr-1" />
                    hr@techcorp.com
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Users} 
            title="Total Employees" 
            value={companyData.totalEmployees} 
            subtitle="Active workforce"
            trend={companyData.growthRate}
          />
          <StatCard 
            icon={Building2} 
            title="Departments" 
            value={companyData.departments} 
            subtitle="Operational divisions"
            color="orange"
          />
        </div>

        {/* Employee Table */}
        <div className="mb-8">
          <EmployeeTable employees={companyData.employees} />
        </div>

      </div>
    </div>
  );
};

export default CompanyDashboard;