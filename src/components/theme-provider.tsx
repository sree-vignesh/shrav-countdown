"use client";

import { useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
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
    <>
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 text-sm px-3 py-1 rounded shadow-md hover:opacity-80"
      >
        {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      {children}
    </>
  );
}
