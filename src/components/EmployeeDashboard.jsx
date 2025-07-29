import React, { useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { UserCircle } from 'lucide-react';
import { Fragment } from 'react';
import ThemeToggle from './ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  TrendingUp, 
  Building2, 
  Calendar,
  Award,
  Target,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  BarChart3,
  Clock,
  CheckCircle,
  Trophy,
  Briefcase,
  Star,
  Activity,
  Users,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Edit
} from 'lucide-react';

// Mock data for employee dashboard
const mockData = {
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
      projectsDelivegreen: 8,
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
      achievements: ["Led team of 5 developers", "Delivegreen 3 major projects", "95% code review approval"],
      current: true
    },
    {
      id: 2,
      position: "Software Engineer",
      department: "Software Engineering", 
      startDate: "2022-03-15",
      endDate: "2023-05-31",
      manager: "Amit Kumar",
      achievements: ["Completed React certification", "greenuced bug reports by 40%", "Mentogreen 2 junior developers"],
      current: false
    }
  ],
  recentProjects: [
    {
      id: 1,
      name: "Customer Portal greenesign",
      status: "Completed",
      completion: 100,
      deadline: "2024-01-15",
      team: ["Alice", "Bob", "Charlie"],
      priority: "High"
    },
    {
      id: 2,
      name: "API Integration Module",
      status: "In Progress",
      completion: 75,
      deadline: "2024-02-10",
      team: ["David", "Eve"],
      priority: "Medium"
    },
    {
      id: 3,
      name: "Mobile App Enhancement",
      status: "Planning",
      completion: 10,
      deadline: "2024-03-01",
      team: ["Frank", "Grace"],
      priority: "Low"
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

const StatCard = ({ icon: Icon, title, value, subtitle, color = "green", trend }) => (
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


const WorkHistoryCard = ({ job }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`p-3 ${job.current ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'} rounded-lg`}>
          <Briefcase className={`w-6 h-6 ${job.current ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">{job.position}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{job.department}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">Manager: {job.manager}</p>
        </div>
      </div>
      {job.current && (
        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
          Current
        </span>
      )}
    </div>
    
    <div className="mb-4">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {job.startDate} - {job.endDate}
      </p>
    </div>
    
    <div>
      <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Achievements</h5>
      <ul className="space-y-1">
        {job.achievements.map((achievement, index) => (
          <li key={index} className="flex items-start space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-400">{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const SkillBar = ({ skill }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-2">
      <div>
        <span className="text-sm font-medium text-gray-900 dark:text-white">{skill.name}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({skill.category})</span>
      </div>
      <span className="text-sm font-medium text-green-600 dark:text-green-400">{skill.level}%</span>
    </div>
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
      <div 
        className="bg-green-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${skill.level}%` }}
      ></div>
    </div>
  </div>
);

const EmployeeDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <Brain className="w-8 h-8 text-green-600 dark:text-green-400" />
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
        {/* Employee Profile Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-600 to-green-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{mockData.employee.avatar}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">{mockData.employee.name}</h1>
                  <p className="text-green-100 text-lg mb-2">{mockData.employee.position}</p>
                  <div className="flex items-center space-x-4 text-sm text-green-100">
                    <div className="flex items-center space-x-1">
                      <Building2 className="w-4 h-4" />
                      <span>{mockData.company.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mockData.employee.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {mockData.employee.joinDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'history', name: 'Work History', icon: Clock },
                { id: 'skills', name: 'Skills', icon: Award }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-green-500 text-green-600 dark:text-green-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={CheckCircle}
                title="Tasks Completed"
                value={mockData.performance.currentQuarter.tasksCompleted}
                subtitle="This quarter"
                color="green"
                trend="+18%"
              />
              <StatCard
                icon={Briefcase}
                title="Projects Delivegreen"
                value={mockData.performance.currentQuarter.projectsDelivegreen}
                subtitle="Successfully completed"
                color="blue"
                trend="+25%"
              />
              <StatCard
                icon={Activity}
                title="Efficiency Score"
                value={`${mockData.performance.currentQuarter.efficiency}%`}
                subtitle="Above average"
                color="purple"
                trend="+12%"
              />
              <StatCard
                icon={Star}
                title="Overall Rating"
                value={mockData.performance.overallRating}
                subtitle="Out of 5.0"
                color="green"
                trend="+0.3"
              />
            </div>


          </div>
        )}



        {selectedTab === 'history' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Work History</h3>
            {mockData.workHistory.map(job => (
              <WorkHistoryCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {selectedTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Technical Skills</h3>
              {mockData.skills.filter(skill => ['Frontend', 'Backend', 'Cloud'].includes(skill.category)).map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Soft Skills</h3>
              {mockData.skills.filter(skill => skill.category === 'Soft Skills').map((skill, index) => (
                <SkillBar key={index} skill={skill} />
              ))}
              
              <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Skill Development Goals</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Complete Advanced React certification</li>
                  <li>• Learn Docker and Kubernetes</li>
                  <li>• Improve public speaking skills</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EmployeeDashboard;
