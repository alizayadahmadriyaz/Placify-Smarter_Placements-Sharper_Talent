import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, TrendingUp, Eye, Mic, Brain,
  Award, Target, CheckCircle, AlertTriangle,
  Home, Play
} from 'lucide-react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";

// Mock interview results (you can later fetch from backend instead)
const interviewResults = [
  {
    id: '1753311835655',
    overallScore: 85,
    totalQuestions: 10,
    correctAnswers: 8,
    timeTaken: '3 mins 45 secs',
    metrics: [
      {
        category: 'Clarity of Voice',
        score: 92,
        badge: 'Excellent',
        color: 'emerald',
        icon: <Mic className="w-5 h-5" />,
        feedback: 'Your articulation and vocal clarity were outstanding throughout the interview.'
      },
      {
        category: 'Confidence (Eye Contact)',
        score: 78,
        badge: 'Good',
        color: 'blue',
        icon: <Eye className="w-5 h-5" />,
        feedback: 'Good eye contact maintained. Try to look directly at the camera more consistently.'
      },
      {
        category: 'Technical Keywords',
        score: 50,
        badge: 'Needs Improvement',
        color: 'orange',
        icon: <Brain className="w-5 h-5" />,
        feedback: 'Include more industry-specific terminology and technical concepts in your responses.'
      }
    ]
  },
  {
    id: '2',
    overallScore: 72,
    totalQuestions: 10,
    correctAnswers: 6,
    timeTaken: '4 mins 20 secs',
    metrics: [
      {
        category: 'Clarity of Voice',
        score: 68,
        badge: 'Average',
        color: 'orange',
        icon: <Mic className="w-5 h-5" />,
        feedback: 'Try to slow down slightly and articulate more clearly.'
      },
      {
        category: 'Confidence (Eye Contact)',
        score: 75,
        badge: 'Good',
        color: 'blue',
        icon: <Eye className="w-5 h-5" />,
        feedback: 'Decent confidence, but consider practicing with a camera.'
      },
      {
        category: 'Technical Keywords',
        score: 55,
        badge: 'Needs Improvement',
        color: 'orange',
        icon: <Brain className="w-5 h-5" />,
        feedback: 'Include more specific technical terms and concepts.'
      }
    ]
  }
];


const ResultsPage = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();

  const result = interviewResults.find((r) => r.id === interviewId);

  if (!result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Award className="w-12 h-12 mx-auto text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Interview Completed
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your interview session has finished, but we couldn't retrieve the detailed analysis.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Interview ID: {interviewId}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              aria-label="Return to Dashboard"
            >
              <Home className="w-5 h-5" />
              Return to Dashboard
            </button>
            <button
              onClick={() => navigate('/interview')}
              className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              aria-label="Try Another Interview"
            >
              <Play className="w-5 h-5" />
              Try Another Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { overallScore, metrics: performanceMetrics, totalQuestions, correctAnswers, timeTaken } = result;

  const incorrectAnswers = totalQuestions - correctAnswers;
  const accuracy = ((correctAnswers / totalQuestions) * 100).toFixed(2);

  const pieData = [
    { name: 'Correct', value: correctAnswers },
    { name: 'Incorrect', value: incorrectAnswers },
  ];

  const COLORS = ['#4ade80', '#f87171']; // green, red

  const scoreData = [
    { name: 'Prev Session 1', score: 60 },
    { name: 'Prev Session 2', score: 72 },
    { name: 'Current Session', score: overallScore },
  ];

  const basicStats = [
    { label: "Total Questions", value: totalQuestions },
    { label: "Accuracy", value: `${accuracy}%` },
    { label: "Time Taken", value: timeTaken },
  ];

  const getBadgeStyles = (color) => {
    const styles = {
      emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900 dark:text-emerald-100 dark:border-emerald-800',
      blue: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-800',
      orange: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-100 dark:border-orange-800',
      red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800'
    };
    return styles[color] || styles.blue;
  };

  const getProgressColor = (color) => {
    const colors = {
      emerald: 'bg-emerald-500 dark:bg-emerald-400',
      blue: 'bg-blue-500 dark:bg-blue-400',
      orange: 'bg-orange-500 dark:bg-orange-400',
      red: 'bg-red-500 dark:bg-red-400'
    };
    return colors[color] || colors.blue;
  };

  const getIconBg = (color) => {
    const styles = {
      emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-200',
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200',
      orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-200',
      red: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200'
    };
    return styles[color] || styles.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-950 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900
                        px-4 py-2 rounded-lg hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            aria-label="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interview Results
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Here's your detailed performance analysis
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 dark:from-purple-800 dark:to-indigo-900 rounded-2xl p-8 text-white mb-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold mb-2">{overallScore}</div>
              <div className="text-2xl text-purple-200 dark:text-purple-300">Overall Score</div>
            </div>
            <div className="bg-white/20 dark:bg-white/10 rounded-xl p-4">
              <p className="text-lg font-medium mb-2">🎉 Great Performance!</p>
              <p className="text-purple-100 dark:text-purple-200">
                You demonstrated strong communication skills and professional presence.
                Keep refining your technical vocabulary to reach the next level.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 dark:bg-gray-950 dark:border-gray-800 p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span>Performance Metrics</span>
            </h2>

            <div className="space-y-6">
              {/* Improved Grid: Charts + Stats Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* Pie Chart Box */}
                <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Correct vs Incorrect</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Line Chart Box */}
                <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Score Progress</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={scoreData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#3b82f6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>


              {/* Basic Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-center">
                {basicStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-center items-center min-h-[100px]"
                  >
                    <span className="text-base font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {stat.label}
                    </span>
                    <span className="text-lg mt-1 text-blue-600 dark:text-blue-400 font-medium">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>


              {/* Metrics Section */}
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getIconBg(metric.color)}`}>
                        {metric.icon}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{metric.category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{metric.score}%</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getBadgeStyles(metric.color)}`}>
                        {metric.badge}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(metric.color)}`}
                      style={{ width: `${metric.score}%` }}
                    ></div>
                  </div>

                  {/* Feedback */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {metric.feedback}
                  </p>
                </div>
              ))}

            </div>
          </div>

          <div className="space-y-6">
            {/* Behavioral Analysis */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 dark:bg-gray-950 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Behavioral Indicators
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
                  <span className="text-gray-700 dark:text-gray-200">Tone: Positive and Engaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  <span className="text-gray-700 dark:text-gray-200">Energy Level: Appropriate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                  <span className="text-gray-700 dark:text-gray-200">Professional Demeanor: Strong</span>
                </div>
              </div>
            </div>

            {/* Personalized Feedback */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 dark:bg-gray-950 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Personalized Feedback
              </h3>

              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 dark:bg-emerald-950 dark:border-emerald-800">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-300 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-emerald-800 dark:text-emerald-200">What you did well:</h4>
                      <p className="text-emerald-700 dark:text-emerald-100 text-sm mt-1">
                        You spoke clearly with excellent vocal clarity and maintained good confidence throughout the interview.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 dark:bg-orange-950 dark:border-orange-800">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-300 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800 dark:text-orange-200">Areas for improvement:</h4>
                      <p className="text-orange-700 dark:text-orange-100 text-sm mt-1">
                        Try to incorporate more technical keywords from the job description in your answers. Practice industry-specific terminology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> 

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 dark:from-blue-950 dark:to-purple-950 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recommended Next Steps
              </h3>
              <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                  <span>Practice technical vocabulary for your target role</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                  <span>Continue maintaining excellent communication clarity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                  <span>Schedule another practice session to track improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/interview')}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold
                        hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 transform hover:scale-105 transition-all duration-200"
            aria-label="Practice Again"
          >
            Practice Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold
                        hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Back to Dashboard"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;