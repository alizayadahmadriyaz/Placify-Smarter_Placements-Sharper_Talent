import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Brain } from 'lucide-react';
import axios from 'axios';

import { useAuth } from '../context/AuthContext'; 
import { useUser } from '../context/UserContext';
import { jwtDecode } from 'jwt-decode'; 

import { motion } from 'framer-motion';

const AuthPage = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();  
  const { authenticateUser } = useUser();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let token;
      
      // First try to authenticate from local storage users
      try {
        const result = authenticateUser(email, password);
        token = result.token;
      } catch (localAuthErr) {
        console.log('Local auth failed, trying API:', localAuthErr.message);
        
        // If local auth fails, try the API (if backend exists)
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
          token = response.data.token;
        } catch (apiErr) {
          console.error('API auth failed:', apiErr);
          throw new Error('Invalid email or password');
        }
      }
      
      // If we got a token from either source, proceed with login
      if (token) {
        // Verify token has correct format (header.payload.signature)
        if (!token.includes('.') || token.split('.').length !== 3) {
          throw new Error('Invalid token format');
        }
        
        localStorage.setItem('token', token);
        setIsAuthenticated(true);

        try {
          const decoded = jwtDecode(token);
          const role = decoded.role;

          switch (role) {
            case 'institution':
              navigate('/dashboard/institution');
              break;
            case 'employee':
              navigate('/dashboard/employee');
              break;
            case 'company':
              navigate('/dashboard/company');
              break;
            default:
              navigate('/dashboard');
          }
        } catch (decodeErr) {
          console.error('Token decode error:', decodeErr);
          throw new Error('Invalid token format');
        }
      } else {
        throw new Error('Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
<motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full space-y-8"
      >
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8"
        >
          {/* Header */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-8"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center space-x-2 mb-4"
            >
              <Brain className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Placify</span>
            </motion.div>
            <motion.h2 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-3xl font-bold text-gray-900 dark:text-white"
            >
              {isLogin ? 'Welcome back' : 'Create account'}
            </motion.h2>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-gray-600 dark:text-gray-300 mt-2"
            >
              {isLogin ? 'Sign in to your account' : 'Start your journey with us'}
            </motion.p>
          </motion.div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-red-500 text-center mb-4"
            >
              {error}
            </motion.p>
          )}

          {/* Form */}
          <motion.form 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            {/* Email */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-xl 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent
                             transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-700 rounded-xl 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent
                             transition-all duration-200"
                  placeholder="Enter your password"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl font-semibold
                         hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                         transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : null}
              {loading ? 'Signing in...' : isLogin ? 'Sign In' : 'Sign Up'}
            </motion.button>
          </motion.form>

          {/* Switch */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-600 dark:text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={isLogin ? () => navigate('/register') : () => setIsLogin(true)}
                className="ml-2 text-purple-600 font-semibold"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </motion.button>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AuthPage;
