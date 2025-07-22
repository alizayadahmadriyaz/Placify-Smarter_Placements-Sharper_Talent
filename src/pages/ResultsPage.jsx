import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, TrendingUp, Eye, Mic, Brain,
  Award, Target, CheckCircle, AlertTriangle
} from 'lucide-react';


// Mock interview results (you can later fetch from backend instead)
const interviewResults = [
  {
    id: '1',
    overallScore: 85,
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
  console.log("Interview ID from URL:", interviewId);
  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-red-500">
        No results found for Interview ID: {interviewId}
      </div>
    );
  }

  const { overallScore, metrics } = result;

  const getBadgeStyles = (color) => {
    const styles = {
      emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      orange: 'bg-orange-100 text-orange-800 border-orange-200',
      red: 'bg-red-100 text-red-800 border-red-200'
    };
    return styles[color] || styles.blue;
  };

  const getProgressColor = (color) => {
    const colors = {
      emerald: 'bg-emerald-500',
      blue: 'bg-blue-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 
                       px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
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
            <Award className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interview Results
          </h1>
          <p className="text-xl text-gray-600">
            Here's your detailed performance analysis
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-8 text-white mb-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="text-6xl font-bold mb-2">{overallScore}</div>
              <div className="text-2xl text-purple-200">Overall Score</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <p className="text-lg font-medium mb-2">🎉 Great Performance!</p>
              <p className="text-purple-100">
                You demonstrated strong communication skills and professional presence. 
                Keep refining your technical vocabulary to reach the next level.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Target className="w-6 h-6 text-purple-600" />
              <span>Performance Metrics</span>
            </h2>

            <div className="space-y-6">
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${metric.color}-100 text-${metric.color}-600`}>
                        {metric.icon}
                      </div>
                      <span className="font-semibold text-gray-900">{metric.category}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-gray-900">{metric.score}%</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getBadgeStyles(metric.color)}`}>
                        {metric.badge}
                      </span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(metric.color)}`}
                      style={{ width: `${metric.score}%` }}
                    ></div>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {metric.feedback}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Behavioral Analysis */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Behavioral Indicators
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                  <span className="text-gray-700">Tone: Positive and Engaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">Energy Level: Appropriate</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700">Professional Demeanor: Strong</span>
                </div>
              </div>
            </div>

            {/* Personalized Feedback */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personalized Feedback
              </h3>
              
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-emerald-800">What you did well:</h4>
                      <p className="text-emerald-700 text-sm mt-1">
                        You spoke clearly with excellent vocal clarity and maintained good confidence throughout the interview.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800">Areas for improvement:</h4>
                      <p className="text-orange-700 text-sm mt-1">
                        Try to incorporate more technical keywords from the job description in your answers. Practice industry-specific terminology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recommended Next Steps
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Practice technical vocabulary for your target role</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Continue maintaining excellent communication clarity</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
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
                       hover:bg-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            Practice Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold
                       hover:bg-gray-300 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;