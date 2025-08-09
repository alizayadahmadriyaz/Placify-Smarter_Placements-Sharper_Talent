
import React, { useState } from "react";
import challenges from "../../data/challenges";
import { useNavigate } from "react-router-dom";

const ChallengeCard = ({ c, onOpen }) => (
  <div
    className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer"
    onClick={() => onOpen(c)}
  >
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold">{c.title}</h3>
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          c.difficulty === "Easy"
            ? "bg-green-100 text-green-700"
            : c.difficulty === "Medium"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {c.difficulty}
      </span>
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
      {c.description}
    </p>
    <div className="text-xs text-gray-500">
      Tags: {Array.isArray(c.tags) ? c.tags.join(", ") : "None"}
    </div>
  </div>
);

const Modal = ({ open, onClose, challenge }) => {
  const navigate = useNavigate();

  if (!open || !challenge) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
      className="absolute inset-0 bg-black/40"
      onClick={onClose}
      aria-hidden="true"
      />
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg z-10 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-start">
        <div>
        <h2 className="text-2xl font-bold">{challenge.title}</h2>
        <p className="text-sm text-gray-500">
          {challenge.difficulty} • {Array.isArray(challenge.tags) ? challenge.tags.join(", ") : "No tags"}
        </p>
        </div>
                <div className="flex gap-2 justify-end">
        <button
          onClick={() => {
          onClose();
          navigate(`/dashboard/coding/${challenge.id}`);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Start Challenge
        </button>

        <button
          onClick={() => {
          onClose();
          navigate(`/dashboard/coding/${challenge.id}?view=solution`);
          }}
          className="bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-slate-600 transition"
        >
          Show Solution
        </button>
        <button
        className="text-gray-600 hover:text-gray-900 text-xl"
        onClick={onClose}
        >
        ✕
        </button>
        </div>
      </div>

      <hr className="my-4" />

      <div className="space-y-4">
        <div>
        <p className="text-sm font-medium mb-2">Description</p>
        <pre className="bg-gray-100 dark:bg-slate-700 rounded p-3 overflow-auto text-sm whitespace-pre-wrap">
          {
          // Render markdown-like code blocks as <code> blocks
          typeof challenge.description === "string"
            ? challenge.description
              .split(/(```[\s\S]*?```)/g)
              .map((part, idx) => {
              if (/^```[\s\S]*```$/.test(part)) {
                // Remove the triple backticks and trim
                const code = part.replace(/^```|```$/g, "").trim();
                return (
                <code
                  key={idx}
                  className="block bg-gray-200 dark:bg-slate-800 rounded p-2 my-2 font-mono text-[0.95em] whitespace-pre"
                >
                  {code}
                </code>
                );
              }
              // Bold **xyz** in the description
              const withBold = part.replace(/\*\*(.*?)\*\*/g, (_, text) => `<strong>${text}</strong>`);
              return (
                <span
                key={idx}
                dangerouslySetInnerHTML={{ __html: withBold }}
                />
              );
              })
            : challenge.description
          }
        </pre>
        </div>

        <div>
        <p className="text-sm font-medium mb-2">Starter Code</p>
        <pre className="bg-gray-50 dark:bg-slate-900 rounded p-3 overflow-auto text-sm">
          {challenge.starterCode || "// No starter code provided"}
        </pre>
        </div>


      </div>
      </div>
    </div>
  );
};

const Coding = () => {
  const [openChallenge, setOpenChallenge] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Coding Practice</h1>
      <p className="text-sm text-gray-600 mb-6">
        Practice common interview coding problems — start with any challenge to
        open details and the editor.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((c) => (
          <ChallengeCard
            key={c.id}
            c={c}
            onOpen={(ch) => setOpenChallenge(ch)}
          />
        ))}
      </div>

      <Modal
        open={!!openChallenge}
        onClose={() => setOpenChallenge(null)}
        challenge={openChallenge}
      />
    </div>
  );
};

export default Coding;

