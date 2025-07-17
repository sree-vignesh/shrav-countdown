// components/CountdownProgress.tsx
"use client";

import React from "react";
import { Progress } from "./ui/progress";

type Props = {
  startDate: Date;
  endDate: Date;
};

export default function ProgressBar({ startDate, endDate }: Props) {
  const now = new Date();
  const total = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const remaining = Math.max(
    0,
    Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );
  const completed = total - remaining;
  const percent = Math.min(100, Math.round((completed / total) * 100));

  return (
    <div className="font-mono w-full mt-4 font-bold">
      <div className="mb-1  text-primary dark:text-pink-700">
        {percent}% over d
      </div>
      <div>
        <Progress value={percent} />
      </div>
    </div>
  );
}
