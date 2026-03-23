import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Dumbbell, Timer } from "lucide-react";
import { authClient } from "@/app/_lib/auth-client";
import { getWorkoutDayById } from "@/app/_lib/api/fetch-generated";
import type { GetWorkoutDayById200SessionsItem } from "@/app/_lib/api/fetch-generated";
import { HomePageGuard } from "@/app/_components/home/home-page-guard";
import { BottomNav } from "@/app/_components/home/bottom-nav";
import { WorkoutDayBadge } from "@/app/_components/home/workout-day-badge";
import { Badge } from "@/app/_components/ui/badge";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Empty, EmptyTitle } from "@/app/_components/ui/empty";
import { WorkoutDayTopBar } from "@/app/_components/workout-day-detail/workout-day-top-bar";
import { WorkoutDaySessionActions } from "@/app/_components/workout-day-detail/workout-day-session-actions";
import { WorkoutDayExerciseRow } from "@/app/_components/workout-day-detail/workout-day-exercise-row";

const FALLBACK_COVER =
  "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=1200&q=80";

function formatMinutes(seconds: number) {
  const m = Math.max(1, Math.round(seconds / 60));
  return `${m}min`;
}

function sessionState(sessions: GetWorkoutDayById200SessionsItem[]) {
  const hasCompletedSession = sessions.some((s) => Boolean(s.completedAt));
  const active = sessions.find(
    (s) => Boolean(s.startedAt) && !s.completedAt,
  );
  return {
    hasCompletedSession,
    activeSessionId: active?.id ?? null,
  };
}

interface PageProps {
  params: Promise<{ workoutPlanId: string; workoutDayId: string }>;
}

export default async function WorkoutDayPage({ params }: PageProps) {
  const { workoutPlanId, workoutDayId } = await params;

  const sessionResult = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const session =
    sessionResult &&
    typeof sessionResult === "object" &&
    "data" in sessionResult
      ? sessionResult.data
      : sessionResult;

  if (!session?.user) {
    redirect("/auth");
  }

  const res = await getWorkoutDayById(workoutPlanId, workoutDayId);

  if (res.status === 404 || res.status === 403) {
    redirect("/");
  }

  if (res.status !== 200) {
    redirect("/auth");
  }

  const day = res.data;
  const { hasCompletedSession, activeSessionId } = sessionState(day.sessions);
  const exercises = [...day.exercises].sort((a, b) => a.order - b.order);

  return (
    <HomePageGuard>
      <div className="flex min-h-full flex-col bg-background pb-28">
        <WorkoutDayTopBar />
        <div className="mx-auto w-full max-w-lg flex-1 px-4 pb-4 pt-2">
          <Card className="gap-0 overflow-hidden rounded-2xl border-border/80 py-0 shadow-md ring-1 ring-border/40">
            <div className="relative aspect-16/10 w-full">
              <Image
                src={day.coverImageUrl ?? FALLBACK_COVER}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 480px"
                priority
                unoptimized={Boolean(day.coverImageUrl)}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/88 via-black/35 to-black/50" />
              <div className="absolute left-3 top-3">
                <WorkoutDayBadge weekDay={day.weekDay} />
              </div>
              <CardContent className="absolute inset-x-0 bottom-0 border-0 bg-transparent px-4 pb-4 pt-10 shadow-none ring-0">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-white drop-shadow-sm">
                  {day.name}
                </h1>
                {!day.isRest ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="h-7 rounded-full border border-white/20 bg-white/15 px-2.5 text-xs font-medium text-white backdrop-blur-sm [&>svg]:size-3.5"
                    >
                      <Timer strokeWidth={2} aria-hidden />
                      {formatMinutes(day.estimatedDurationInSeconds)}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="h-7 rounded-full border border-white/20 bg-white/15 px-2.5 text-xs font-medium text-white backdrop-blur-sm [&>svg]:size-3.5"
                    >
                      <Dumbbell strokeWidth={2} aria-hidden />
                      {exercises.length} exercícios
                    </Badge>
                  </div>
                ) : null}
              </CardContent>
            </div>
          </Card>

          <section className="mt-6">
            <h2 className="mb-3 text-sm font-bold text-foreground">
              Exercícios do dia
            </h2>
            {day.isRest || exercises.length === 0 ? (
              <Empty className="min-h-[120px] rounded-xl border border-dashed border-border/80 bg-muted/20 py-8">
                <EmptyTitle className="text-sm font-medium text-muted-foreground">
                  {day.isRest
                    ? "Dia de descanso — sem exercícios."
                    : "Nenhum exercício neste dia."}
                </EmptyTitle>
              </Empty>
            ) : (
              <ul className="flex flex-col gap-2">
                {exercises.map((exercise) => (
                  <li key={exercise.id}>
                    <WorkoutDayExerciseRow exercise={exercise} />
                  </li>
                ))}
              </ul>
            )}
          </section>

          {!day.isRest ? (
            <div className="mt-8">
              <WorkoutDaySessionActions
                workoutPlanId={workoutPlanId}
                workoutDayId={workoutDayId}
                hasCompletedSession={hasCompletedSession}
                activeSessionId={activeSessionId}
              />
            </div>
          ) : null}
        </div>
        <BottomNav />
      </div>
    </HomePageGuard>
  );
}
