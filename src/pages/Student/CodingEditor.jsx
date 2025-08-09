import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import challenges from "../../data/challenges";
import Editor from "@monaco-editor/react";

const CodingEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const challenge = challenges.find((c) => c.id === id);
  const showSolution = searchParams.get("view") === "solution";

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (challenge) {
      if (showSolution && challenge.solution) {
        setCode(challenge.solution);
      } else {
        setCode(challenge.starterCode || "");
      }
    }
  }, [challenge, showSolution]);

  const runCode = async () => {
    setIsRunning(true);
    setOutput("Running...");

    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const consoleLog = [];
      const mockConsole = {
        log: (...args) => consoleLog.push(args.join(" ")),
        error: (...args) => consoleLog.push("ERROR: " + args.join(" ")),
        warn: (...args) => consoleLog.push("WARNING: " + args.join(" ")),
      };

      const safeGlobals = {
        console: mockConsole,
        Math,
        Date,
        Array,
        Object,
        String,
        Number,
        Boolean,
        JSON,
      };

      const func = new Function(...Object.keys(safeGlobals), code);
      func(...Object.values(safeGlobals));

      setOutput(
        consoleLog.length > 0
          ? consoleLog.join("\n")
          : "✅ Code executed successfully (no output)"
      );
    } catch (err) {
      setOutput(`❌ Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    if (showSolution && challenge.solution) {
      setCode(challenge.solution);
    } else {
      setCode(challenge.starterCode || "");
    }
    setOutput("");
  };

  const toggleSolution = () => {
    if (showSolution) {
      navigate(`/dashboard/coding/${id}`);
    } else {
      navigate(`/dashboard/coding/${id}?view=solution`);
    }
  };

  if (!challenge) {
    return (
      <div className="p-4">
        <p className="text-red-600 mb-4">Challenge not found.</p>
        <button
          onClick={() => navigate("/dashboard/coding")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Go Back to Challenges
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          onClick={() => navigate("/dashboard/coding")}
          className="text-blue-600 hover:text-blue-800 mb-2"
        >
          ← Back to Challenges
        </button>
        <h1 className="text-2xl font-bold mb-2">{challenge.title}</h1>
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              challenge.difficulty === "Easy"
                ? "bg-green-100 text-green-700"
                : challenge.difficulty === "Medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {challenge.difficulty}
          </span>
          {showSolution && (
            <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
              Solution View
            </span>
          )}
        </div>
        <div className="bg-gray-50 dark:bg-slate-800 p-3 rounded mb-4">
          <pre className="whitespace-pre-wrap text-sm">{challenge.description}</pre>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Code Editor:</label>
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <Editor
            height="300px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </div>

      <div className="mb-4 flex gap-2 flex-wrap">
        <button
          onClick={runCode}
          disabled={isRunning}
          className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded transition"
        >
          {isRunning ? "Running..." : "Run Code"}
        </button>

        <button
          onClick={resetCode}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
        >
          Reset
        </button>

        {challenge.solution && (
          <button
            onClick={toggleSolution}
            className={`px-4 py-2 rounded transition ${
              showSolution
                ? "bg-purple-500 hover:bg-purple-600 text-white"
                : "bg-purple-100 hover:bg-purple-200 text-purple-700"
            }`}
          >
            {showSolution ? "Hide Solution" : "Show Solution"}
          </button>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Output:</label>
        <pre className="bg-black text-green-400 p-3 rounded-lg min-h-[100px] overflow-auto">
          {output || "Output will appear here when you run your code..."}
        </pre>
      </div>
    </div>
  );
};

export default CodingEditor;
