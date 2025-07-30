import React, { useState } from 'react';
import {
  Users, Building2, TrendingUp, Eye, MoreHorizontal, Edit,
  Brain, MapPin, Mail, Calendar, Plus, LogOut, UserCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const companyData = {
  name: "TechCorp Solutions",
  logo: "TC",
  totalEmployees: 450,
  departments: 8,
  avgPerformance: 8.2,
  topPerformers: 23,
  growthRate: 12.5,
  employees: [
    { id: 1, name: "Sarah Chen", role: "Senior Software Engineer", department: "Engineering", performance: 8.7, experience: "3.5 years", email: "sarah.chen@techcorp.com" },
    { id: 2, name: "John Smith", role: "Product Manager", department: "Product", performance: 9.1, experience: "5 years", email: "john.smith@techcorp.com" },
    { id: 3, name: "Lisa Wang", role: "UX Designer", department: "Design", performance: 8.9, experience: "4 years", email: "lisa.wang@techcorp.com" },
    { id: 4, name: "Mark Johnson", role: "DevOps Engineer", department: "Engineering", performance: 8.3, experience: "2.5 years", email: "mark.johnson@techcorp.com" },
    { id: 5, name: "Emily Davis", role: "Data Scientist", department: "Analytics", performance: 9.0, experience: "3 years", email: "emily.davis@techcorp.com" }
  ]
};

const notify = (msg) => toast.success(msg);

const CompanyDashboard = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="min-h-screen bg-gradient-to-tr from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Placify</h1>
          </div>
          <div className='flex items-center space-x-2'>
            <ThemeToggle />
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center px-2 py-1 rounded-full focus:outline-none">
                <UserCircle className="w-7 h-7 text-gray-600 dark:text-white" />
              </Menu.Button>
              <Transition as={Fragment} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-white`}>
                          <UserCircle className="w-4 h-4 mr-2" /> Profile
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }} className={`${active ? 'bg-gray-100 dark:bg-gray-700' : ''} flex items-center px-4 py-2 text-sm w-full text-left text-gray-700 dark:text-white`}>
                          <LogOut className="w-4 h-4 mr-2" /> Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-xl mb-8">
          <div className="flex flex-wrap items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold">{companyData.logo}</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">{companyData.name}</h2>
              <p className="text-pink-100 mt-1">Technology Solutions Company</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> San Francisco, CA</span>
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> Founded 2018</span>
                <span className="flex items-center"><Mail className="w-4 h-4 mr-1" /> hr@techcorp.com</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Employees</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{companyData.totalEmployees}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Active workforce</p>
                <div className="flex items-center mt-2 text-green-500">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">+{companyData.growthRate}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Departments</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{companyData.departments}</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">Operational divisions</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl min-h-[200px] flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm italic">
          More metrics and charts coming soon...
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </motion.div>
  );
};

export default CompanyDashboard;
