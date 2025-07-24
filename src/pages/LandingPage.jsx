import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Brain, Users,Zap,User, Target, CheckCircle } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";
const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced algorithms analyze your communication skills, confidence, and technical knowledge",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real Interview Experience",
      description:
        "Practice with realistic interview scenarios tailored to your target companies",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Feedback",
      description:
        "Get detailed insights and actionable recommendations to improve your performance",
    },
  ];

  const benefits = [
    "Boost your interview confidence",
    "Get hired by top companies",
    "Receive expert-level feedback",
    "Practice anytime, anywhere",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
          <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-purple-200 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 md:py-4 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
        
        {/* Logo + Placify Text + Get Started + Theme Toggle (on mobile) */}
        <div className="flex items-center space-x-2 md:space-x-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center space-x-2 md:space-x-3">
            <Brain className="md:w-8 md:h-8 w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="md:text-4xl text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Placify
            </span>
          </div>

          {/* Show Get Started + ThemeToggle on mobile beside logo */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              className="bg-purple-600 flex text-sm items-center hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-full transition-all duration-300"
              onClick={() => navigate("/auth")}
            >
              <Zap className="w-4 h-4 mr-1" />
              Get Started
            </button>

            <ThemeToggle />
          </div>
        </div>

        {/* Right Side: Buttons (visible on md+) */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Sign In */}
          <button
            className="text-xl px-6 py-3 flex items-center space-x-2 bg-transparent border border-gray-300 dark:text-white dark:border-gray-600 rounded-full hover:bg-purple-600 hover:text-white dark:hover:bg-gray-800 transition"
            onClick={() => navigate("/auth")}
          >
            <User className="w-6 h-6" />
            <span>Sign In</span>
          </button>

          {/* Get Started */}
          <button
            className="bg-purple-600 flex text-xl items-center hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300"
            onClick={() => navigate("/auth")}
          >
            <Zap className="w-5 h-5 mr-2" />
            Get Started
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>


      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 dark:from-purple-800 dark:via-purple-900 dark:to-indigo-950 text-white transition-colors mt-16 duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Placify: Smarter Placements.
              <br />
              <span className="text-purple-200 dark:text-purple-300">Sharper Talent.</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 dark:text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Campus hiring is broken. Traditional interviews fail to identify
              the best talent, leaving both students and companies frustrated
              with mismatched placements.
            </p>
            <p className="text-lg md:text-xl text-purple-200 dark:text-purple-300 mb-12 max-w-2xl mx-auto">
              Transform your interview skills with AI-powered practice sessions.
              Get real-time feedback, build confidence, and land your dream job
              with personalized coaching.
            </p>
            <button
              onClick={() => navigate("/auth")}
              className="bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 px-8 py-4 rounded-xl font-semibold text-lg 
                         hover:bg-gray-50 dark:hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 
                         shadow-xl hover:shadow-2xl inline-flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Placify?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of interview preparation with cutting-edge
              AI technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 
                           hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-purple-100 
                           dark:hover:border-purple-400 transform hover:-translate-y-1"
              >
                <div className="text-purple-600 dark:text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Unlock Your Full Potential
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of students who have successfully landed their
                dream jobs with Placify's AI-powered interview coaching.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-lg text-gray-700 dark:text-gray-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  85%
                </div>
                <div className="text-gray-600 dark:text-gray-300 mb-6">Success Rate</div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  10K+
                </div>
                <div className="text-gray-600 dark:text-gray-300 mb-6">Students Placed</div>
                <div className="text-3xl font-bold text-emerald-500 dark:text-emerald-400 mb-2">
                  500+
                </div>
                <div className="text-gray-600 dark:text-gray-300">Partner Companies</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-950 text-white transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl dark:text-white text-black font-bold mb-6">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-400 mb-8">
            Start your journey today and join the ranks of successful
            professionals
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-purple-600 dark:bg-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg 
                       hover:bg-purple-700 dark:hover:bg-purple-800 transform hover:scale-105 transition-all duration-200 
                       shadow-xl hover:shadow-2xl inline-flex items-center space-x-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
