import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, CheckCircle } from "lucide-react";
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
  const chatEndRef = useRef(null);

  // Persist state
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ messages, currentQuestion, score })
    );
  }, [messages, currentQuestion, score]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const answer = userInput.trim();
    const updatedMessages = [...messages, { sender: "user", text: answer }];
    setMessages(updatedMessages);
    setUserInput("");

    // Score logic (basic: +1 if answer has more than 5 words)
    if (answer.split(" ").length >= 5) {
      setScore((prev) => prev + 1);
    }

    // Fetch next question
    setLoadingNext(true);
    let nextQuestion;
    try {
      nextQuestion = await getNextQuestion(
        role,
        updatedMessages.filter((m) => m.sender === "user").map((m) => m.text)
      );
      console.log("Received Question from Gemini:", nextQuestion);
    } catch (e) {
      console.warn("Gemini failed, using fallback", e);
      nextQuestion =
        fallbackQuestions[(currentQuestion - 1) % fallbackQuestions.length];
    }

    setLoadingNext(false);

    if (!nextQuestion || nextQuestion.toLowerCase().includes("end interview")) {
      return;
    }

    setMessages((prev) => [...prev, { sender: "bot", text: nextQuestion }]);
    setCurrentQuestion((prev) => prev + 1);
  };

  return (
    <motion.div
      className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8"
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="dark:bg-gray-800 bg-white rounded-2xl h-full p-8 flex flex-col">
        {/* Header with score */}
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

        {/* Chat */}
        <div className="overflow-y-auto pr-2 space-y-3 mb-4 h-[400px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
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

          {loadingNext && (
            <div className="flex justify-start">
              <Bot className="w-6 h-6 text-blue-700 mr-2" />
              <div className="max-w-xs p-3 rounded-lg shadow bg-white text-gray-900">
                <motion.span
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  typing...
                </motion.span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-gray-300 pt-4">
          <input
            type="text"
            placeholder="Type your answer..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        {/* Finish Button */}
        {currentQuestion >= 10 && (
          <button
            onClick={onFinish}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg w-full"
          >
            <CheckCircle className="inline-block w-5 h-5 mr-2" />
            Finish Interview
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default InterviewRight;
