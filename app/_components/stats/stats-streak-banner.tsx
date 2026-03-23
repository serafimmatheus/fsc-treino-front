import { Flame } from "lucide-react";
import { cn } from "@/app/_lib/utils";

interface StatsStreakBannerProps {
  workoutStreak: number;
}

export function StatsStreakBanner({ workoutStreak }: StatsStreakBannerProps) {
  const active = workoutStreak > 0;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] px-6 py-9 text-center text-white shadow-md",
        active
          ? "bg-linear-to-br from-[#ff8a3d] via-[#e85d2c] to-[#7f1d1d]"
          : "bg-linear-to-br from-[#d4d4d4] via-[#737373] to-[#262626]",
      )}
    >
      <div className="mx-auto flex size-18 items-center justify-center rounded-full bg-white/25 ring-2 ring-white/30">
        <Flame
          className="size-9 shrink-0 fill-white text-white"
          strokeWidth={1.35}
          aria-hidden
        />
      </div>
      <p className="mt-5 text-4xl font-bold leading-none tracking-tight tabular-nums">
        {workoutStreak} {workoutStreak === 1 ? "dia" : "dias"}
      </p>
      <p className="mt-2 text-sm font-semibold text-white/95">
        Sequência Atual
      </p>
    </div>
  );
}
