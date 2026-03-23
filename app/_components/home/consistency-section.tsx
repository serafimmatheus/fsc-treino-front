import dayjs from "dayjs";
import { cn } from "@/app/_lib/utils";

const WEEKDAY_LABELS = ["S", "T", "Q", "Q", "S", "S", "D"] as const;

type ConsistencyByDay = Record<
  string,
  { workoutDayCompleted: boolean; workoutDayStarted: boolean }
>;

interface ConsistencySectionProps {
  consistencyByDay: ConsistencyByDay;
  workoutStreak: number;
}

function getWeekDates() {
  const dates: string[] = [];
  for (let i = 1; i <= 7; i++) {
    const d = dayjs().day(i === 7 ? 0 : i);
    dates.push(d.format("YYYY-MM-DD"));
  }
  return dates;
}

export function ConsistencySection({
  consistencyByDay,
  workoutStreak,
}: ConsistencySectionProps) {
  const weekDates = getWeekDates();

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-foreground">Consistência</h2>
        <button
          type="button"
          className="text-sm text-primary hover:underline"
          onClick={() => {}}
        >
          Ver histórico
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex gap-2 flex-1">
          {weekDates.map((dateKey, i) => {
            const state = consistencyByDay[dateKey] ?? {
              workoutDayCompleted: false,
              workoutDayStarted: false,
            };
            const isCompleted = state.workoutDayCompleted;
            const isStarted = state.workoutDayStarted && !isCompleted;
            return (
              <div
                key={dateKey}
                className={cn(
                  "flex-1 aspect-square rounded-lg flex items-center justify-center text-xs font-medium",
                  isCompleted && "bg-primary text-primary-foreground",
                  isStarted && "bg-primary/40 text-primary-foreground",
                  !isCompleted && !isStarted && "bg-background border border-border text-muted-foreground"
                )}
              >
                {WEEKDAY_LABELS[i]}
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-streak text-streak-foreground px-3 py-2 shrink-0">
          <svg className="size-5 shrink-0" viewBox="0 0 256 256" fill="currentColor" aria-hidden>
            <path d="M144 24v16h-32V24a8 8 0 0 1 16 0v16h16V24a8 8 0 0 1 16 0Zm88 80a96 96 0 0 0-96-96c-43.26 0-79.06 32.49-91.43 75.22a4 4 0 0 0 5.57 4.7c14.42-6.74 32.86-10.34 50.86-10.34 29.38 0 54.78 10.4 72.86 28.48A93 93 0 0 1 232 152a8 8 0 0 0 16 0 96 96 0 0 0-16-48Zm-16.58 40c-15.36-15.36-35.72-23.72-57.28-23.72-12.62 0-25.22 2.5-37.14 7.36A80 80 0 0 1 40 104a8 8 0 0 0-16 0 96 96 0 0 0 96 96 95 95 0 0 0 59.76-20.59 95 95 0 0 0 59.76 20.59 96 96 0 0 0 96-96 8 8 0 0 0-16 0Z" />
          </svg>
          <span className="font-bold">{workoutStreak}</span>
        </div>
      </div>
    </section>
  );
}
