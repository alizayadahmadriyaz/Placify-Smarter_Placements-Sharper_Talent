import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Mic, Bot, Send, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import axios from "axios";
import QuestionBank from "./register/QuestionBank";

const InterviewInterface = () => {
  // loading simulation
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const chatEndRef = useRef(null);

  const [cameraPermission, setCameraPermission] = useState("pending");
  const [userInput, setUserInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi let's start with the interview. Tell me about yourself.",
    },
  ]);

  <QuestionBank/>

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
          const response = await axios.post(
            "http://localhost:5000/api/interviews/upload",
            formData
          );
          console.log("Video Blob Uploaded successfully");

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
          localStorage.setItem(interviewId, JSON.stringify(resultData));
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
          localStorage.setItem(interviewId, JSON.stringify(resultData));
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
      localStorage.setItem(interviewId, JSON.stringify(resultData));
      navigate(`/results/${interviewId}`);
    }
  };

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
  };
  if (isLoading) return <Loader type="interviewPage" />;

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
          <motion.div
            className="flex items-center space-x-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {cameraPermission === "granted" && (
              <motion.div
                className="flex items-center space-x-1 text-emerald-500"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <Camera className="w-4 h-4" />
                <span className="text-sm">Camera Active</span>
              </motion.div>
            )}
            <motion.div
              className="flex items-center space-x-1 text-emerald-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.5,
                type: "spring",
                stiffness: 200,
              }}
            >
              <Mic className="w-4 h-4" />
              <span className="text-sm">Mic Active</span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Panel - Video Feed */}
        <motion.div
          className="hidden lg:flex w-full lg:w-1/2 px-6 py-12"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div
            className="rounded-2xl h-full flex items-center justify-center relative overflow-hidden dark:bg-black bg-white transition-colors duration-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          >
            {cameraPermission === "pending" && (
              <motion.div
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  Camera Permission Required
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  Please allow camera access to continue with the interview
                </motion.p>
                <motion.button
                  onClick={requestCameraAccess}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  Grant Camera Access
                </motion.button>
              </motion.div>
            )}
            {cameraPermission === "denied" && (
              <motion.div
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                </motion.div>
                <motion.h3
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  Camera Access Denied
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  Please enable camera access in your browser settings
                </motion.p>
                <motion.button
                  onClick={requestCameraAccess}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  Try Again
                </motion.button>
              </motion.div>
            )}
            {cameraPermission === "granted" && (
              <>
                <motion.video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-64 sm:h-80 md:h-full object-cover rounded-2xl"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-red-500 rounded-full"
                    animate={{
                      opacity: [1, 0.3, 1],
                      scale: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-sm text-white">Recording</span>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
        <div className="block lg:hidden w-full px-6 py-6 text-center text-xl bg-blue-600 font-semibold text-gray-700 dark:text-gray-300">
          👀 You are being watched — camera is recording in the background.
        </div>

        {/* Right Panel - Chat Interface */}
        <motion.div
          className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            className="dark:bg-gray-800 bg-white rounded-2xl h-full p-8 flex flex-col transition-colors duration-300"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center gap-3 border-b-2 border-gray-300 pb-4 mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.7,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <Bot className="h-8 w-8 text-blue-700" />
              </motion.div>
              <motion.h2
                className="text-2xl font-semibold"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                Interview Questions
              </motion.h2>
            </motion.div>

            <motion.div
              className="mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="bg-purple-600 h-2 rounded-full"
                  animate={{
                    width: `${
                      (currentQuestion / interviewQuestions.length) * 100
                    }%`,
                  }}
                  initial={{ width: "0%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </motion.div>

            {/* Scrollable Chat Area */}
            <motion.div
              className="overflow-y-auto pr-2 space-y-3 mb-4 h-[500px] sm:h-[350px] md:h-[400px] lg:h-[450px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center ${
                    msg.sender === "bot" ? "justify-start" : "justify-end"
                  }`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 1.1 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {msg.sender === "bot" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                    >
                      <Bot className="w-6 h-6 text-blue-700 mr-2" />
                    </motion.div>
                  )}
                  <motion.div
                    className={`max-w-xs p-3 rounded-lg shadow ${
                      msg.sender === "bot"
                        ? "bg-white text-gray-900"
                        : "bg-blue-600 text-white"
                    }`}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    {msg.text}
                  </motion.div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </motion.div>

            {/* Input Area */}
            <motion.div
              className="flex items-center gap-2 border-t border-gray-300 pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <motion.input
                type="text"
                placeholder="Type your answer..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 1.4 }}
                whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
              />
              <motion.button
                onClick={handleSend}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 1.5,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.9 }}
              >
                <Send className="h-5 w-5" />
              </motion.button>
            </motion.div>

            {/* Finish Interview Button */}
            {currentQuestion >= interviewQuestions.length && (
              <motion.button
                onClick={handleFinishInterview}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg w-full"
                initial={{ y: 30, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckCircle className="inline-block w-5 h-5 mr-2" />
                Finish Interview
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InterviewInterface;
