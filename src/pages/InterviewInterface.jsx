import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, SkipForward, Square, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
const InterviewInterface = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [cameraPermission, setCameraPermission] = useState('pending');
  const [isRecording, setIsRecording] = useState(false);

  const questions = [
    "Tell me about yourself and what makes you a great candidate for this position.",
    "What are your greatest strengths and how do they apply to this role?",
    "Describe a challenging project you worked on and how you overcame obstacles.",
    "Where do you see yourself in 5 years and how does this position fit into your goals?"
  ];

  useEffect(() => {
    requestCameraAccess();
  }, []);

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraPermission('granted');
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraPermission('denied');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishInterview = () => {
    // Stop camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
    }
    navigate('/results');
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <motion.div
      className="min-h-screen dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="dark:bg-black/50 bg-white/80 p-4 transition-colors duration-300"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {cameraPermission === 'granted' && (
                <motion.div
                  className="flex items-center space-x-1 dark:text-emerald-400 text-emerald-600"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <Camera className="w-4 h-4" />
                  <span className="text-sm">Camera Active</span>
                </motion.div>
              )}
              <motion.div
                className="flex items-center space-x-1 dark:text-emerald-400 text-emerald-600"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Mic className="w-4 h-4" />
                <span className="text-sm">Mic Active</span>
              </motion.div>
            </div>
          </div>
          <div className="dark:text-white text-gray-900">
            <span className="text-sm">Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
        </div>
      </motion.div>

      <div className="flex h-screen">
        {/* Left Panel - Video Feed */}
        <motion.div
          className="flex-1 p-6"
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="rounded-2xl h-full flex items-center justify-center relative overflow-hidden dark:bg-black bg-white transition-colors duration-300">
            {cameraPermission === 'pending' && (
              <motion.div
                className="text-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Camera Permission Required</h3>
                <p className="dark:text-gray-400 text-gray-600 mb-4">Please allow camera access to continue with the interview</p>
                <button
                  onClick={requestCameraAccess}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                >
                  Grant Camera Access
                </button>
              </motion.div>
            )}

            {cameraPermission === 'denied' && (
              <motion.div
                className="text-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white text-gray-900">Camera Access Denied</h3>
                <p className="dark:text-gray-400 text-gray-600 mb-4">Please enable camera access in your browser settings</p>
                <button
                  onClick={requestCameraAccess}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
              </motion.div>
            )}

            {cameraPermission === 'granted' && (
              <>
                <motion.video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 flex items-center space-x-2 dark:bg-black/50 bg-white/80 px-3 py-2 rounded-lg transition-colors duration-300"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Recording</span>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>

        {/* Right Panel - Questions */}
        <motion.div
          className="w-1/2 p-6"
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="dark:bg-gray-800 bg-white rounded-2xl h-full p-8 flex flex-col transition-colors duration-300">
            {/* Progress Bar */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm dark:text-gray-400 text-gray-600">Progress</span>
                <span className="text-sm dark:text-gray-400 text-gray-600">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full dark:bg-gray-700 bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.6 }}
                ></motion.div>
              </div>
            </motion.div>

            {/* Current Question */}
            <motion.div
              className="flex-1 flex flex-col justify-center"
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 leading-tight dark:text-white text-gray-900">
                  {questions[currentQuestionIndex]}
                </h2>
                <motion.div
                  className="bg-purple-600/20 dark:bg-purple-600/20 bg-purple-100 border border-purple-500/30 rounded-xl p-4"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <p className="dark:text-purple-200 text-purple-800 text-sm">
                    💡 <strong>Tip:</strong> Take your time to think before answering. 
                    Speak clearly and maintain eye contact with the camera.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Controls */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex space-x-4">
                {!isLastQuestion ? (
                  <button
                    onClick={handleNextQuestion}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-xl 
                               font-semibold flex items-center justify-center space-x-2 
                               transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                    <span>Next Question</span>
                  </button>
                ) : (
                  <button
                    onClick={handleFinishInterview}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 px-6 py-4 rounded-xl 
                               font-semibold flex items-center justify-center space-x-2 
                               transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Finish Interview</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => navigate('/dashboard')}
                className="w-full dark:text-gray-400 text-gray-600 hover:text-white dark:hover:text-white py-2 transition-colors"
              >
                Exit Interview
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InterviewInterface;