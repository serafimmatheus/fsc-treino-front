import type { GetStats200 } from "@/app/_lib/api/fetch-generated";
import { StatsConsistencyHeatmap } from "./stats-consistency-heatmap";
import { StatsStreakBanner } from "./stats-streak-banner";
import { StatsSummaryCards } from "./stats-summary-cards";

interface StatsScreenProps {
  stats: GetStats200;
}

export function StatsScreen({ stats }: StatsScreenProps) {
  return (
    <main className="flex flex-1 flex-col px-4 pb-28 pt-6">
      <p className="text-lg font-bold uppercase tracking-wide text-foreground">
        FIT.AI
      </p>

      <div className="mt-5 space-y-6">
        <StatsStreakBanner workoutStreak={stats.workoutStreak} />
        <StatsConsistencyHeatmap consistencyByDay={stats.consistencyByDay} />
        <StatsSummaryCards
          conclusionRate={stats.conclusionRate}
          completedWorkoutsCount={stats.completedWorkoutsCount}
          totalTimeInSeconds={stats.totalTimeInSeconds}
        />
      </div>
    </main>
  );
}
