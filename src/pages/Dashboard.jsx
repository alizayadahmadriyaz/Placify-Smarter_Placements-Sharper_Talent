import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Play, Calendar, Clock, TrendingUp, Award, LogOut } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Navbar from "../components/Navbar";
import { UserCircle } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Settings } from 'lucide-react';
const Dashboard = () => {
  const navigate = useNavigate();
  // loader simulation
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  const pastInterviews = [
    {
      id: '1',
      title: 'Software Engineer Interview',
      company: 'Tech Corp',
      date: 'December 15, 2024',
      score: 87,
      status: 'Completed'
    },
    {
      id: '2',
      title: 'Frontend Developer Interview',
      company: 'StartupXYZ',
      date: 'December 10, 2024',
      score: 92,
      status: 'Completed'
    },
    {
      id: '3',
      title: 'Full Stack Developer Interview',
      company: 'Innovation Labs',
      date: 'December 5, 2024',
      score: 78,
      status: 'Completed'
    }
  ];
  const Dashboard = () => {
    return (
      <>
        <Navbar />
        {/* Your dashboard content below */}
      </>
    );
  };
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900';
    if (score >= 80) return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900';
    if (score >= 70) return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-900';
    return 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900';
  };
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
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">Placify</span>
            </div>
            <div className='flex items-center space-x-2'>

              <ThemeToggle />
              <ProfileDropdown />

            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome back, Student! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Ready to practice and improve your interview skills?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white min-h-[16vh] dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow ">
            <div className="flex items-center space-x-3 min-h-[8vh]">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Total Interviews</p>
                {isLoading ? (
                  <Loader />
                ) : (
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">12</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold">Average Score</p>
                {isLoading ? (
                  <Loader />
                ) : (
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">85.7</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold">Practice Hours</p>
                {isLoading ? (
                  <Loader />
                ) : (
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">24.5</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Start New Interview Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 dark:from-purple-800 dark:to-indigo-900 p-8 rounded-2xl text-white">
              <div className="text-center">
                <div className="mb-6">
                  <Play className="w-16 h-16 mx-auto mb-4 text-purple-200 dark:text-purple-300" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Start New Interview</h2>
                <p className="text-purple-200 dark:text-purple-300 mb-6 leading-relaxed">
                  Practice with AI-powered mock interviews tailored to your career goals
                </p>
                <button
                  onClick={() => navigate('/interview')}
                  className="w-full bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-300 px-6 py-4 rounded-xl font-semibold text-lg
                             hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-200
                             shadow-lg hover:shadow-xl"
                >
                  Start Interview
                </button>
              </div>
            </div>
          </div>

          {/* Past Interviews Section */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Past Interviews</h2>
                <Calendar className="w-6 h-6 text-gray-400 dark:text-gray-300" />
              </div>
              {isLoading ? (
                <Loader type="asyncLoad" />
              ) : (

                <div className="space-y-4">

                  {pastInterviews.map((interview) => (
                    <div
                      key={interview.id}

                      onClick={() => navigate(`/results/${interview.id}`)}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl
                               hover:bg-gray-100 dark:bg-slate-600 hover:dark:bg-slate-700 transition-colors cursor-pointer"

                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {interview.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{interview.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{interview.date}</span>
                          </span>
                          <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-medium">
                            {interview.status}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className={`px-4 py-2 rounded-xl font-bold text-lg ${getScoreColor(interview.score)}`}>
                          {interview.score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
              }

              <div className="mt-6 text-center">
                <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium">
                  View All Interviews →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;