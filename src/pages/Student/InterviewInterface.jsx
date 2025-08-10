import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { AlertCircle, Camera, CameraOff, Mic, MicOff, Bot, Send, CheckCircle, ArrowDownCircle } from "lucide-react";
import { getNextQuestion } from "../../lib/geminiHelper";
 // Adjust the import path as necessary

const InterviewInterface = () => {
  const navigate = useNavigate();
  // const [stopRecording, setStopRecording] = useState(null);
  const [answers, setAnswers] = useState([]);
  const interviewId = Date.now().toString();
  const [isStreamReady, setIsStreamReady] = useState(false);
  const [cameraPermission, setCameraPermission] = useState("pending");
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [loadingNext, setLoadingNext] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  const questions = [
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
    "Thank you for your time. We will get back to you shortly"
  ];

  useEffect(() => {
    requestCameraAccess();
    setMessages([{ sender: "bot", text: questions[0] }]);
  }, []);

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9,opus",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.start();
      setCameraPermission("granted");
      setIsStreamReady(true);
    } catch (error) {
      console.error("Camera access denied:", error);
      setCameraPermission("denied");
      setIsStreamReady(false);
    }
  };

  const stopRecording = () => {
    return new Promise((resolve) => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.onstop = () => {
          const videoBlob = new Blob(recordedChunksRef.current, {
            type: "video/webm; codecs=vp9,opus",
          });
          resolve(videoBlob);
        };
        mediaRecorderRef.current.stop();
      } else resolve(null);
    });
  };

  const handleFinishInterview = useCallback(async () => {
    try {
      const videoBlob = await stopRecording();

      const formData = new FormData();
      if (videoBlob)
        formData.append("video", videoBlob, `interview_${interviewId}.webm`);
      formData.append("answers", JSON.stringify(answers));
      formData.append("interviewId", interviewId);

      await axios.post("http://localhost:5000/api/interviews/upload", formData);

      navigate(`/results/${interviewId}`);
    } catch (err) {
      console.error("Upload failed", err);
      navigate(`/results/${interviewId}`);
    }
  }, [stopRecording, answers, navigate, interviewId]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const answer = userInput.trim().toLowerCase();
    setUserInput("");
    const updatedMessages = [...messages, { sender: "user", text: answer }];
    setMessages(updatedMessages);

    if (answer === "stop" || answer === "end") {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "The interview has ended. Thank you for your time!" },
      ]);
      setTimeout(() => {
        handleFinishInterview();
      }, 2000);
      return;
    }

    setLoadingNext(true);
    let nextQuestion = questions[currentQuestion];
    setLoadingNext(false);

    if (nextQuestion) {
      setMessages((prev) => [...prev, { sender: "bot", text: nextQuestion }]);
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToBottom = (force = false) => {
    if (shouldAutoScroll || force) {
      setTimeout(() => {
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 50);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingNext]);

  const handleScroll = () => {
    const container = chatContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    setShouldAutoScroll(isNearBottom);
    setShowScrollButton(!isNearBottom);
  };

  const handleScrollToBottom = () => {
    setShouldAutoScroll(true);
    scrollToBottom(true);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="flex-1 p-4">
        <motion.div
          className="rounded-2xl h-full flex flex-col items-center justify-center relative overflow-hidden dark:bg-black bg-white transition-colors duration-300"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        >
          {cameraPermission === "pending" && (
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Camera Permission Required</h3>
              <p className="text-gray-600 mb-4">Please allow camera access to continue with the interview</p>
              <button
                onClick={requestCameraAccess}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium"
              >
                Grant Camera Access
              </button>
            </div>
          )}

          {cameraPermission === "denied" && (
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Camera Access Denied</h3>
              <p className="text-gray-600 mb-4">Please enable camera access in your browser settings</p>
              <button
                onClick={requestCameraAccess}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium"
              >
                Try Again
              </button>
            </div>
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
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm text-white">Recording</span>
              </div>

              <div className="absolute top-4 right-4 flex gap-3">
                <button
                  onClick={() => {
                    const videoTrack = streamRef.current.getVideoTracks()[0];
                    if (videoTrack) {
                      videoTrack.enabled = !videoTrack.enabled;
                      setIsCameraOn(videoTrack.enabled);
                    }
                  }}
                  className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg text-white hover:bg-black/70 transition"
                >
                  {isCameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
                  {isCameraOn ? "Camera On" : "Camera Off"}
                </button>

                <button
                  onClick={() => {
                    const audioTrack = streamRef.current.getAudioTracks()[0];
                    if (audioTrack) {
                      audioTrack.enabled = !audioTrack.enabled;
                      setIsMicOn(audioTrack.enabled);
                    }
                  }}
                  className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg text-white hover:bg-black/70 transition"
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  {isMicOn ? "Mic On" : "Mic Off"}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>

      <div className="flex-1 p-4">
        <motion.div
          className="dark:bg-gray-800 bg-white rounded-2xl h-full p-8 flex flex-col relative"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <button
              className="text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded transition-colors duration-200 border border-blue-100 shadow-sm"
              onClick={() => {
                setMessages([{ sender: "bot", text: questions[0] }]);
                setCurrentQuestion(1);
                setScore(0);
                setUserInput("");
                setShouldAutoScroll(true);
                setShowScrollButton(false);
              }}
            >
              Restart Interview
            </button>
            <div className="flex-1 flex flex-col items-center min-w-[180px] max-w-xs w-full">
              <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                <motion.div
                  className="bg-purple-600 h-2 rounded-full"
                  animate={{ width: `${Math.min((currentQuestion / 10) * 100, 100)}%` }}
                  initial={{ width: "0%" }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <span className="text-xs text-gray-500">Question {currentQuestion} / 10</span>
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300 px-4 py-2 rounded bg-gray-100 dark:bg-gray-700 shadow-sm">
              Score: {score}
            </span>
          </div>

          <div
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="overflow-y-auto pr-2 space-y-3 mb-4 h-[400px] scroll-smooth relative"
            style={{ scrollBehavior: "smooth" }}
          >
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
              >
                {msg.sender === "bot" && (
                  <Bot className="w-6 h-6 text-blue-700 mr-2 flex-shrink-0 mt-1" />
                )}
                <div
                  className={`max-w-xs p-3 rounded-lg shadow ${
                    msg.sender === "bot"
                      ? "bg-white text-gray-900 border border-gray-200"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}

            {loadingNext && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <Bot className="w-6 h-6 text-blue-700 mr-2 flex-shrink-0 mt-1" />
                <div className="max-w-xs p-3 rounded-lg shadow bg-white text-gray-900 border border-gray-200">
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    Thinking...
                  </motion.span>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} className="h-1" />
          </div>

          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleScrollToBottom}
              className="absolute right-6 bottom-24 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors duration-200 z-10"
              title="Scroll to latest message"
            >
              <ArrowDownCircle className="h-5 w-5" />
            </motion.button>
          )}

          <div className="flex items-center gap-2 border-t border-gray-300 pt-4">
            <input
              type="text"
              placeholder="Type your answer..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loadingNext}
            />
            <button
              onClick={handleSend}
              disabled={loadingNext || !userInput.trim()}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
          {currentQuestion >= 10 && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleFinishInterview}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg w-full transition-colors duration-200"
            >
              <CheckCircle className="inline-block w-5 h-5 mr-2" />
              Finish Interview
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewInterface;
