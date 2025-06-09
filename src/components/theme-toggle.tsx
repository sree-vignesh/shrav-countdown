"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isCurrentlyDark = root.classList.contains("dark");

    if (isCurrentlyDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="w-16 h-8 flex items-center bg-gray-300 dark:bg-pink-950/45 dark:border-1 dark:border-pink-700 rounded-full p-1 transition-colors duration-500"
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm transition-transform duration-500 transform bg-white dark:bg-black dark:border-1 dark:border-amber-300 shadow-md ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? "🌙" : "🌞"}
      </div>
    </button>
  );
}
