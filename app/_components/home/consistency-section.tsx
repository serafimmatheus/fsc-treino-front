import dayjs from "dayjs";
import Link from "next/link";
import { Flame } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
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
    <section className="px-4 pt-2 pb-2">
      <Card className="gap-0 overflow-hidden rounded-2xl border-border/80 py-0 shadow-md ring-1 ring-border/40">
        <CardHeader className="border-b border-border/50 px-4 py-4">
          <CardTitle className="text-base font-bold text-foreground">
            Consistência
          </CardTitle>
          <CardAction>
            <Button
              variant="link"
              className="h-auto p-0 text-sm font-medium text-primary"
              asChild
            >
              <Link href="/stats">Ver histórico</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-row items-stretch gap-3 px-4 py-4">
          <div className="flex flex-1 gap-1.5 rounded-xl border border-border/60 bg-muted/30 p-2.5 shadow-inner sm:gap-2 sm:p-3">
            {weekDates.map((dateKey, i) => {
              const state = consistencyByDay[dateKey] ?? {
                workoutDayCompleted: false,
                workoutDayStarted: false,
              };
              const isCompleted = state.workoutDayCompleted;
              const isStarted = state.workoutDayStarted && !isCompleted;
              return (
                <Badge
                  key={dateKey}
                  variant={
                    isCompleted
                      ? "default"
                      : isStarted
                        ? "secondary"
                        : "outline"
                  }
                  className={cn(
                    "aspect-square h-auto min-h-8 w-full min-w-0 max-w-11 flex-1 justify-center rounded-lg border px-0 py-2 text-xs font-semibold shadow-none transition-colors",
                    isCompleted &&
                      "border-transparent bg-primary text-primary-foreground shadow-sm",
                    isStarted &&
                      "border-transparent bg-primary/50 text-primary-foreground",
                    !isCompleted &&
                      !isStarted &&
                      "border-border/80 bg-card text-muted-foreground",
                  )}
                >
                  {WEEKDAY_LABELS[i]}
                </Badge>
              );
            })}
          </div>
          <Card className="min-w-18 shrink-0 gap-0 rounded-xl border-0 bg-streak py-0 text-streak-foreground shadow-sm ring-1 ring-streak-foreground/10">
            <CardContent className="flex flex-col items-center justify-center gap-1 px-3 py-3">
              <Flame
                className="size-6 shrink-0 fill-current opacity-90"
                strokeWidth={1.5}
                aria-hidden
              />
              <span className="text-lg font-bold leading-none tabular-nums">
                {workoutStreak}
              </span>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </section>
  );
}
