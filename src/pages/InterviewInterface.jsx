import React, { useState, useEffect, useRef } from "react";
import { Camera, Mic, Bot, Send, AlertCircle, CheckCircle, ChevronDown } from "lucide-react";

const InterviewInterface = () => {
  // loading simulation
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = (path) => {
    console.log("Navigation would go to:", path);
  };
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null); 
  const [showScrollButton, setShowScrollButton] = useState(false);

  const [cameraPermission, setCameraPermission] = useState("pending");
  const [userInput, setUserInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi let's start with the interview. Tell me about yourself.",
    },
  ]);

  const interviewQuestions = [
    "Hi let's start with the interview. Tell me about yourself.",
    "Why do you want to work at this company?",
    "What are your strengths and weaknesses?",
    "Describe a challenge you faced and how you overcame it.",
    "Where do you see yourself in 5 years?",
    "What motivates you?",
    "How do you handle stress and pressure?",
    "What is your biggest professional achievement?",
    "How do you prioritize your work?",
    "Why should we hire you?",
    "Thank you for your time. We will get back to you shortly",
  ];

  useEffect(() => {
    requestCameraAccess();
  }, []);

  // Auto-scroll effect for chat messages
  useEffect(() => {
    const scrollToBottom = () => {
      if (chatEndRef.current && chatContainerRef.current) {
        // Method 1: Scroll container to bottom
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        
        // Method 2: Scroll the end element into view with smooth behavior
        setTimeout(() => {
          chatEndRef.current?.scrollIntoView({ 
            behavior: "smooth", 
            block: "end",
            inline: "nearest"
          });
        }, 100);
      }
    };

    // Use longer delay to ensure DOM updates are complete
    const timeout = setTimeout(scrollToBottom, 200);
    return () => clearTimeout(timeout);
  }, [messages]);

  // Enhanced scroll detection for the scroll-to-bottom button
  const handleChatScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;
    const isAtBottom =
      container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
    setShowScrollButton(!isAtBottom);
  };

  // Manual scroll to bottom function
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      //initializing the mediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9,opus",
      });

      //collection of chunks
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      //start the recording
      mediaRecorderRef.current.start();

      setCameraPermission("granted");
    } catch (error) {
      console.error("Camera access denied:", error);
      setCameraPermission("denied");
    }
  };

  const interviewId = Date.now().toString();

  //here in the handlefinish interview I will stop recording and create a blob of the recorded video after collecting the chunks
  const handleFinishInterview = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.onstop = async () => {
        try {
          const videoBlob = new Blob(recordedChunksRef.current, {
            type: "video/webm; codecs=vp9,opus",
          });
          const formData = new FormData();
          formData.append("video", videoBlob, `interview_${interviewId}.webm`);
          formData.append("interviewId", interviewId);
          
          // For demo - simulate API call
          console.log("Video Blob would be uploaded");

          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
          }
          const resultData = {
            id: interviewId,
            name: "Candidate Name",
            score: 7,
            videoUploaded: true,
            total: interviewQuestions.length,
            feedback: "Good communication and clarity.",
          };
          // localStorage.setItem(interviewId, JSON.stringify(resultData));
          navigate(`/results/${interviewId}`);
        } catch (error) {
          console.log("Error uploading video Blob");

          const resultData = {
            id: interviewId,
            name: "Candidate Name",
            score: 7,
            videoUploaded: false,
            total: interviewQuestions.length,
            feedback: "Good communication and clarity.",
          };
          // localStorage.setItem(interviewId, JSON.stringify(resultData));
          navigate(`/results/${interviewId}`);
        }
      };

      mediaRecorderRef.current.stop();
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
      const resultData = {
        id: interviewId,
        name: "Candidate Name",
        score: 7,
        videoUploaded: false,
        total: interviewQuestions.length,
        feedback: "Good communication and clarity.",
      };
      // localStorage.setItem(interviewId, JSON.stringify(resultData));
      navigate(`/results/${interviewId}`);
    }
  };

  // Enhanced handleSend with immediate scroll trigger
  const handleSend = () => {
    if (userInput.trim() === "") return;

    const updatedMessages = [...messages, { sender: "user", text: userInput }];

    if (currentQuestion < interviewQuestions.length) {
      updatedMessages.push({
        sender: "bot",
        text: interviewQuestions[currentQuestion],
      });
      setCurrentQuestion(currentQuestion + 1);
    }

    setMessages(updatedMessages);
    setUserInput("");

    // Additional immediate scroll trigger as backup
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 50);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="dark:bg-black/50 bg-white/80 p-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {cameraPermission === "granted" && (
              <div className="flex items-center space-x-1 text-emerald-500">
                <Camera className="w-4 h-4" />
                <span className="text-sm">Camera Active</span>
              </div>
            )}
            <div className="flex items-center space-x-1 text-emerald-500">
              <Mic className="w-4 h-4" />
              <span className="text-sm">Mic Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Video Feed  */}
        <div className="hidden lg:flex w-full lg:w-1/2 px-6 py-12">
          <div className="rounded-2xl h-full flex items-center justify-center relative overflow-hidden dark:bg-black bg-white transition-colors duration-300">
            {cameraPermission === "pending" && (
              <div className="text-center">
                <div className="animate-pulse">
                  <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Camera Permission Required
                </h3>
                <p className="text-gray-600 mb-4">
                  Please allow camera access to continue with the interview
                </p>
                <button
                  onClick={requestCameraAccess}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                >
                  Grant Camera Access
                </button>
              </div>
            )}
            {cameraPermission === "denied" && (
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Camera Access Denied
                </h3>
                <p className="text-gray-600 mb-4">
                  Please enable camera access in your browser settings
                </p>
                <button
                  onClick={requestCameraAccess}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
            {cameraPermission === "granted" && (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-64 sm:h-80 md:h-full object-cover rounded-2xl"
                />
                <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-white">Recording</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="block lg:hidden w-full px-6 py-6 text-center text-xl bg-blue-600 font-semibold text-gray-700 dark:text-gray-300">
          👀 You are being watched — camera is recording in the background.
        </div>

        {/* Right Panel - Chat Interface  */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8">
          <div className="dark:bg-gray-800 bg-white rounded-2xl h-full p-8 flex flex-col transition-colors duration-300 relative">
            {/* Header */}
            <div className="flex items-center gap-3 border-b-2 border-gray-300 pb-4 mb-4">
              <Bot className="h-8 w-8 text-blue-700" />
              <h2 className="text-2xl font-semibold">Interview Questions</h2>
            </div>

            <div className="mb-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(currentQuestion / interviewQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

           
            <div
              ref={chatContainerRef}
              className="overflow-y-auto pr-2 space-y-3 mb-4 h-[500px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
              onScroll={handleChatScroll}
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    msg.sender === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <Bot className="w-6 h-6 text-blue-700 mr-2" />
                  )}
                  <div
                    className={`max-w-xs p-3 rounded-lg shadow ${
                      msg.sender === "bot"
                        ? "bg-white text-gray-900"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {/* CRITICAL: This div ensures scroll target is always available */}
              <div ref={chatEndRef} className="h-1" />
            </div>

            {/* ADDED: Scroll to Bottom Button */}
            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="absolute right-4 bottom-20 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg z-10 transition-all duration-200"
                title="Scroll to bottom"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            )}

            {/* Input Area */}
            <div className="flex items-center gap-2 border-t border-gray-300 pt-4">
              <input
                type="text"
                placeholder="Type your answer..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>

            {/* Finish Interview Button */}
            {currentQuestion >= interviewQuestions.length && (
              <button
                onClick={handleFinishInterview}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg w-full"
              >
                <CheckCircle className="inline-block w-5 h-5 mr-2" />
                Finish Interview
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewInterface;