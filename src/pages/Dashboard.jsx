import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Brain, Play, Calendar, Clock, TrendingUp, Award, LogOut } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
// import { useEffect, useState } from 'react';
// import Loader from '../components/Loader';
// import Navbar from "../components/Navbar";
import { UserCircle } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
// import { Settings } from 'lucide-react';
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
import { Moon, User } from "lucide-react";

const data = [
  { name: "Jan", interviews: 10, avgScore: 70 },
  { name: "Feb", interviews: 15, avgScore: 75 },
  { name: "Mar", interviews: 8, avgScore: 65 },
  { name: "Apr", interviews: 12, avgScore: 72 },
];

const userName = "John Doe";

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
  


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
          <motion.header 
        className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
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
                className="text-2xl font-bold text-gray-900 dark:text-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                Placify
              </motion.span>
            </motion.div>
            <motion.div 
              className='flex items-center space-x-2'
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ThemeToggle />
             <ProfileDropdown />
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Welcome Message */}
      <div className="text-center py-8">
        <h1 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">Welcome back, <span className="text-blue-600">{userName}</span> 👋</h1>
        <p className="text-gray-400">Here's a quick summary of your performance</p>
      </div>

      {/* Metrics */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
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
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-10">
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

    </div>
  );
}

