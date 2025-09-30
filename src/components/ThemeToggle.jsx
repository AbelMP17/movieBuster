// src/components/ThemeToggle.jsx
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({scrolled}) {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full border border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-400 animate-fade-in" />
      ) : (
        <Moon className={`w-5 h-5 ${scrolled ? "text-gray-800" : "text-gray-400"} animate-fade-in`} />
      )}
    </button>
  );
}
