import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { Empty, EmptyTitle } from "@/app/_components/ui/empty";
import type { GetHomeData200TodayWorkoutDay } from "@/app/_lib/api/fetch-generated";
import { WorkoutDayCard } from "@/app/_components/workout-day-card";

interface TodayWorkoutSectionProps {
  todayWorkoutDay: GetHomeData200TodayWorkoutDay;
}

export function TodayWorkoutSection({
  todayWorkoutDay,
}: TodayWorkoutSectionProps) {
  return (
    <section className="px-4 pb-6">
      <Card className="gap-0 overflow-hidden rounded-2xl border-border/80 py-0 shadow-md ring-1 ring-border/40">
        <CardHeader className="border-b border-border/50 px-4 py-4">
          <CardTitle className="text-base font-bold text-foreground">
            Treino de Hoje
          </CardTitle>
          <CardAction>
            {todayWorkoutDay && !todayWorkoutDay.isRest ? (
              <Button
                variant="link"
                className="h-auto p-0 text-sm font-medium text-primary"
                asChild
              >
                <Link
                  href={`/workout-plans/${todayWorkoutDay.workoutPlanId}`}
                  prefetch={false}
                >
                  Ver treinos
                </Link>
              </Button>
            ) : (
              <Button
                type="button"
                variant="link"
                className="h-auto p-0 text-sm font-medium text-muted-foreground"
                disabled
              >
                Ver treinos
              </Button>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          {!todayWorkoutDay || todayWorkoutDay.isRest ? (
            <Card className="gap-0 overflow-hidden rounded-xl border-0 bg-foreground py-0 text-primary-foreground shadow-inner ring-0">
              <CardContent className="px-4 py-0">
                <Empty className="min-h-[188px] rounded-xl border-0 bg-transparent p-8">
                  <EmptyTitle className="max-w-xs text-balance text-base font-semibold text-primary-foreground">
                    {!todayWorkoutDay
                      ? "Nenhum treino agendado para hoje."
                      : "Hoje é dia de descanso."}
                  </EmptyTitle>
                </Empty>
              </CardContent>
            </Card>
          ) : (
            <WorkoutDayCard workoutDay={todayWorkoutDay} />
          )}
        </CardContent>
      </Card>
    </section>
  );
}
