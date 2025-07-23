import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-white dark:bg-gray-800 rounded"
    >
      {darkMode ? "🌙" : "☀️"}
    </button>
  );
}
