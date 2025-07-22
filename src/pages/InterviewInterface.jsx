import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, SkipForward, Square, AlertCircle, CheckCircle } from 'lucide-react';

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
  const interviewId = Date.now().toString(); // simple ID

 const handleFinishInterview = () => {
  // Stop camera stream
  if (videoRef.current && videoRef.current.srcObject) {
    const stream = videoRef.current.srcObject;
    stream.getTracks().forEach(track => track.stop());
  }

  // Prepare result
  const resultData = {
    id: interviewId,
    name: "Candidate Name", // Replace this with dynamic user info if available
    score: 7,
    total: questions.length,
    feedback: "Good communication and clarity."
  };

  // Save to localStorage
  localStorage.setItem(interviewId, JSON.stringify(resultData));

  // Navigate to results page
  navigate(`/results/${interviewId}`);
};

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-black/50 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {cameraPermission === 'granted' && (
                <div className="flex items-center space-x-1 text-emerald-400">
                  <Camera className="w-4 h-4" />
                  <span className="text-sm">Camera Active</span>
                </div>
              )}
              <div className="flex items-center space-x-1 text-emerald-400">
                <Mic className="w-4 h-4" />
                <span className="text-sm">Mic Active</span>
              </div>
            </div>
          </div>
          <div className="text-white">
            <span className="text-sm">Question {currentQuestionIndex + 1} of {questions.length}</span>
          </div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Panel - Video Feed */}
        <div className="flex-1 p-6">
          <div className="bg-black rounded-2xl h-full flex items-center justify-center relative overflow-hidden">
            {cameraPermission === 'pending' && (
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Camera Permission Required</h3>
                <p className="text-gray-400 mb-4">Please allow camera access to continue with the interview</p>
                <button
                  onClick={requestCameraAccess}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                >
                  Grant Camera Access
                </button>
              </div>
            )}
            
            {cameraPermission === 'denied' && (
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Camera Access Denied</h3>
                <p className="text-gray-400 mb-4">Please enable camera access in your browser settings</p>
                <button
                  onClick={requestCameraAccess}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
            
            {cameraPermission === 'granted' && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Recording</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Panel - Questions */}
        <div className="w-1/2 p-6">
          <div className="bg-gray-800 rounded-2xl h-full p-8 flex flex-col">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-gray-400">
                  {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            {/* Current Question */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 leading-tight">
                  {questions[currentQuestionIndex]}
                </h2>
                <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-4">
                  <p className="text-purple-200 text-sm">
                    💡 <strong>Tip:</strong> Take your time to think before answering. 
                    Speak clearly and maintain eye contact with the camera.
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-4">
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
                className="w-full text-gray-400 hover:text-white py-2 transition-colors"
              >
                Exit Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewInterface;