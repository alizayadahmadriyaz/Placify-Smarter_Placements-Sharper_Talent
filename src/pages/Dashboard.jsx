import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Play, Calendar, Clock, TrendingUp, Award, LogOut } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const pastInterviews = [
    {
      id: 1,
      title: 'Software Engineer Interview',
      company: 'Tech Corp',
      date: 'December 15, 2024',
      score: 87,
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Frontend Developer Interview',
      company: 'StartupXYZ',
      date: 'December 10, 2024',
      score: 92,
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Full Stack Developer Interview',
      company: 'Innovation Labs',
      date: 'December 5, 2024',
      score: 78,
      status: 'Completed'
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50';
    if (score >= 80) return 'text-blue-600 bg-blue-50';
    if (score >= 70) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">Placify</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 
                         px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, Student! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Ready to practice and improve your interview skills?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">85.7</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Practice Hours</p>
                <p className="text-2xl font-bold text-gray-900">24.5</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Start New Interview Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-2xl text-white">
              <div className="text-center">
                <div className="mb-6">
                  <Play className="w-16 h-16 mx-auto mb-4 text-purple-200" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Start New Interview</h2>
                <p className="text-purple-200 mb-6 leading-relaxed">
                  Practice with AI-powered mock interviews tailored to your career goals
                </p>
                <button
                  onClick={() => navigate('/interview')}
                  className="w-full bg-white text-purple-600 px-6 py-4 rounded-xl font-semibold text-lg
                             hover:bg-gray-50 transform hover:scale-105 transition-all duration-200
                             shadow-lg hover:shadow-xl"
                >
                  Start Interview
                </button>
              </div>
            </div>
          </div>

          {/* Past Interviews Section */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Past Interviews</h2>
                <Calendar className="w-6 h-6 text-gray-400" />
              </div>

              <div className="space-y-4">
                {pastInterviews.map((interview) => (
                  <div
                    key={interview.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl
                               hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {interview.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{interview.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{interview.date}</span>
                        </span>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
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

              <div className="mt-6 text-center">
                <button className="text-purple-600 hover:text-purple-700 font-medium">
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