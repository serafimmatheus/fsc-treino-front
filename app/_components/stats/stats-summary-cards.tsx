import type { ReactNode } from "react";
import { Check, Hourglass, Percent } from "lucide-react";
import { cn } from "@/app/_lib/utils";

function formatTotalTimeCompact(seconds: number): string {
  if (seconds <= 0) return "0min";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0 && m > 0) return `${h}h${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}min`;
}

const cardShell =
  "rounded-3xl border border-[#d8e2ff] bg-[#F0F4FF] px-5 py-6 text-center shadow-sm";

function StatCard({
  icon,
  value,
  label,
  className,
}: {
  icon: ReactNode;
  value: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        cardShell,
        "flex flex-col items-center gap-3",
        className,
      )}
    >
      <div
        className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-[#3b59ff]/45 bg-[#e2eaff] text-[#2f4af0]"
        aria-hidden
      >
        {icon}
      </div>
      <p className="text-3xl font-bold leading-none tracking-tight tabular-nums text-foreground sm:text-4xl">
        {value}
      </p>
      <p className="text-sm font-medium leading-snug text-neutral-500">
        {label}
      </p>
    </div>
  );
}

interface StatsSummaryCardsProps {
  conclusionRate: number;
  completedWorkoutsCount: number;
  totalTimeInSeconds: number;
}

export function StatsSummaryCards({
  conclusionRate,
  completedWorkoutsCount,
  totalTimeInSeconds,
}: StatsSummaryCardsProps) {
  const pct = Math.round(conclusionRate * 100);
  const iconStroke = 2.1;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Check className="size-5" strokeWidth={iconStroke} />}
          value={completedWorkoutsCount}
          label="Treinos Feitos"
        />
        <StatCard
          icon={<Percent className="size-5" strokeWidth={iconStroke} />}
          value={`${pct}%`}
          label="Taxa de conclusão"
        />
      </div>
      <StatCard
        className="w-full"
        icon={<Hourglass className="size-5" strokeWidth={iconStroke} />}
        value={formatTotalTimeCompact(totalTimeInSeconds)}
        label="Tempo Total"
      />
    </div>
  );
}
