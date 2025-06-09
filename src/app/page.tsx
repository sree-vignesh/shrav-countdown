"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ThemeToggle from "@/components/theme-toggle";
import PastebinCard from "@/components/PastebinCard";
// import { ThemeProvider } from "@/components/theme-provider";
// import { cn } from "@/lib/utils"; // only if you're using `cn`, else use plain Tailwind
// import { GeistSans } from "geist/font/sans"; // or use your preferred font

export default function Home() {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const target = new Date("2025-08-19T23:59:59"); // 🎯 Change this to your target date

    const updateTime = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("🎉 Time's up!");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days} naatkal and ${hours}h ${minutes}m ${seconds}s`);
    };
    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-accent dark:from-black dark:to-slate-950 p-6">
      <Card className="max-w-lg w-full rounded-2xl shadow-2xl bg-white/90 dark:bg-purple-950/5 backdrop-blur-md dark:border-1 dark:border-pink-950">
        <CardContent className="p-8 flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl sm:text-6xl font-pacifico text-primary  dark:text-pink-400 animate-pulse">
            Hi d Shraavvv !! 🥳
          </h1>
          <br />
          <div className="text-2xl font-mono text-gray-800 dark:text-gray-200">
            Innum <br />
            <span className="font-semibold text-chart-1 dark:text-pink-700">
              {timeLeft}
            </span>
            <br /> dhan d, apro Java Fullstack Developer dhan 🤭
          </div>
          <br />
          <p className="text-3xl text-muted-foreground dark:text-pink-700 font-meow">
            Make things maja pah, one at a time ✨
          </p>
          <ThemeToggle />
        </CardContent>
      </Card>
      <PastebinCard />
    </main>
  );
}
