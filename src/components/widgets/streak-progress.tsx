"use client";

import { Flame, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StreakData } from "@/types/rewards";

type StreakProgressProps = {
  streak?: StreakData;
  variant?: "compact" | "full";
  className?: string;
};

const DEFAULT_STREAK: StreakData = {
  current: 2,
  target: 5,
  label: "NoBail Prize Streak",
};

export const StreakProgress = ({
  streak = DEFAULT_STREAK,
  variant = "compact",
  className,
}: StreakProgressProps) => {
  const remaining = streak.target - streak.current;
  const progressPercentage = (streak.current / streak.target) * 100;

  if (variant === "compact") {
    return (
      <div
        aria-label={`${streak.label}: ${streak.current} of ${streak.target}`}
        className={cn("flex items-center gap-2", className)}
        role="status"
      >
        <div className="flex items-center gap-1.5">
          <Flame className="size-4 text-red-500" />
          <span className="font-semibold text-sm">{streak.current}</span>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: streak.target }).map((_, i) => (
            <div
              className={cn(
                "size-2 rounded-full transition-colors",
                i < streak.current ? "bg-red-500" : "bg-gray-200"
              )}
              key={`streak-dot-${i}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label={`${streak.label}: ${streak.current} of ${streak.target}`}
      className={cn(
        "flex flex-col items-center gap-3 rounded-lg border bg-card p-4",
        className
      )}
      role="status"
    >
      <div className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-red-100 to-red-200">
        <Trophy className="size-7 text-red-600" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <h3 className="font-semibold text-sm">{streak.label}</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-bold text-2xl text-red-600">
            {streak.current}
          </span>
          <span className="text-muted-foreground text-sm">
            / {streak.target}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-red-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Progress dots */}
      <div className="flex w-full justify-between px-1">
        {Array.from({ length: streak.target }).map((_, i) => (
          <div
            className={cn(
              "flex size-6 items-center justify-center rounded-full font-medium text-xs transition-all",
              i < streak.current
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-400"
            )}
            key={`streak-marker-${i}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground text-xs">
        {remaining > 0
          ? `${remaining} more to go or find someone to go for you`
          : "Congratulations! You've earned a reward!"}
      </p>
    </div>
  );
};
