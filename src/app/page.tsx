"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // only if you're using `cn`, else use plain Tailwind
import { GeistSans } from "geist/font/sans"; // or use your preferred font

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

      setTimeLeft(
        `${days} naatkal and ${hours}h ${minutes}m ${seconds}s`
      );
    };
    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-accent dark:from-slate-900 dark:to-slate-800 p-6">
      <Card className="max-w-lg w-full rounded-2xl shadow-2xl bg-white/90 dark:bg-black/80 backdrop-blur-md">
        <CardContent className="p-8 flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl sm:text-6xl font-bold text-primary text-pink-600 dark:text-pink-400 animate-collapsible-down">
            Hi d Shraavvv !! 🥳
          </h1>

          <div className="text-2xl font-mono text-gray-800 dark:text-gray-200">
            Innum <br/><span className="font-semibold text-secondary">{timeLeft}</span><br/> dhan d, apro Java Fullstack Developer dhan 🤭
          </div>

          <p className="text-base sm:text-lg text-muted-foreground font-medium italic">
            Make things maja pah, one at a time ✨
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
