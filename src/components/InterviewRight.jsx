import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, CheckCircle, ArrowDownCircle } from "lucide-react";
import { getNextQuestion } from "../lib/geminiHelper";

// Fallback questions
const fallbackQuestions = [
  "What is React and why is it used?",
  "Explain useState and useEffect hooks.",
  "What are closures in JavaScript?",
  "Explain event delegation.",
  "What are REST APIs?",
];

const STORAGE_KEY = "interview-session";

const InterviewRight = ({ role, initialQuestion, onFinish }) => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved).messages
      : [{ sender: "bot", text: initialQuestion }];
  });
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).currentQuestion : 1;
  });
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).score : 0;
  });
  const [userInput, setUserInput] = useState("");
  const [loadingNext, setLoadingNext] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);

  // Persist state
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ messages, currentQuestion, score })
    );
  }, [messages, currentQuestion, score]);

  // Improved auto-scroll logic
  const scrollToBottom = (force = false) => {
    if (shouldAutoScroll || force) {
      setTimeout(() => {
        if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ 
            behavior: "smooth",
            block: "end"
          });
        }
      }, 50); 
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingNext]);

  // Handle scroll detection
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

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const answer = userInput.trim();
    setUserInput("");
    
    setShouldAutoScroll(true);
    
    // Add user message
    const updatedMessages = [...messages, { sender: "user", text: answer }];
    setMessages(updatedMessages);

    // Basic scoring logic
    if (answer.split(" ").length >= 5) {
      setScore((prev) => prev + 1);
    }

    // Get next question
    setLoadingNext(true);
    let nextQuestion;
    try {
      nextQuestion = await getNextQuestion(
        role,
        updatedMessages.filter((m) => m.sender === "user").map((m) => m.text)
      );
    } catch (e) {
      console.warn("Gemini failed, using fallback", e);
      nextQuestion =
        fallbackQuestions[(currentQuestion - 1) % fallbackQuestions.length];
    }

    setLoadingNext(false);

    if (!nextQuestion || nextQuestion.toLowerCase().includes("end interview")) {
      return;
    }

    // Add bot response
    setMessages((prev) => [...prev, { sender: "bot", text: nextQuestion }]);
    setCurrentQuestion((prev) => prev + 1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8"
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="dark:bg-gray-800 bg-white rounded-2xl h-full p-8 flex flex-col relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="w-2/3 bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-purple-600 h-2 rounded-full"
              animate={{ width: `${(currentQuestion / 10) * 100}%` }}
              initial={{ width: "0%" }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Score: {score}
          </span>
        </div>

        {/* Chat messages */}
        <div
          ref={chatContainerRef}
          onScroll={handleScroll}
          className="overflow-y-auto pr-2 space-y-3 mb-4 h-[400px] scroll-smooth relative"
          style={{ scrollBehavior: 'smooth' }}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.sender === "bot" ? "justify-start" : "justify-end"
              }`}
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
          
          {/* Invisible element to scroll to */}
          <div ref={chatEndRef} className="h-1" />
        </div>

        {/* Scroll to Bottom Button */}
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

        {/* Input */}
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

        {/* Finish Button */}
        {currentQuestion >= 10 && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onFinish}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg w-full transition-colors duration-200"
          >
            <CheckCircle className="inline-block w-5 h-5 mr-2" />
            Finish Interview
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default InterviewRight;